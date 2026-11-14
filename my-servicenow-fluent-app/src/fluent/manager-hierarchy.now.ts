import { ClientScript, ScriptInclude } from '@servicenow/sdk/core'


export const ShowManagerHierarchy = ClientScript({
    $id: Now.ID['cs_show_manager_hierarchy'],
    name: 'Show Manager Hierarchy',
    table: 'incident',
    active: true,
    global: true,
    ui_type: 'all',
    type: 'onChange',
    field: 'category',
    script: script`function onChange(control, oldValue, newValue, isLoading, isTemplate) {
        if (isLoading) return;

        var callerId = g_form.getValue('caller_id');
        if (!callerId) {
            g_form.addInfoMessage("Please select a Caller first.");
            return;
        }

        g_form.clearMessages();

        g_form.getReference('caller_id', function(callerRef) {
            var trueSysId = callerRef.sys_id;
            console.log("EXACT SYS_ID SENT TO SERVER: new " + trueSysId);

            var ga = new GlideAjax('ManagerUtils'); 
            ga.addParam('sysparm_name', 'getChainForAjax'); 
            ga.addParam('sysparm_user_id', trueSysId); 

            ga.getXMLAnswer(function(answer) {
                // Log the raw answer to see exactly what the server returned
                console.log("RAW ANSWER FROM SERVER: ", answer);
                
                if (answer && answer.trim() !== '') {
                    g_form.addInfoMessage("Caller's Manager Chain: " + answer);
                } else {
                    g_form.addInfoMessage("No managers found for this caller.");
                }
            });
        });
    }`
})

export const ManagerUtils = ScriptInclude({
    $id: Now.ID['si_manager_utils'],
    name: 'ManagerUtils',
    active: true,
    clientCallable: true,
    // 🛠️ THE FIX 1: Allow access from the Global scope
    accessibleFrom: 'public',

    // 🛠️ THE FIX 2: Use AbstractAjaxProcessor for GlideAjax compatibility
    script: `var ManagerUtils = Class.create();
    ManagerUtils.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {
        
        getChainForAjax: function() {
            // Now this.getParameter() will work because it extends AbstractAjaxProcessor
            var userId = this.getParameter('sysparm_user_id'); 
            gs.info("SERVER RECEIVED ID: " + userId);
            return this.getManagerChain(userId); 
        },

        getManagerChain: function(userSysId) {
            var chainArray = []; 
            var gr = new GlideRecord('sys_user');
            
            if (gr.get(userSysId)) {
                while (gr.manager) {
                    var managerId = gr.getValue('manager');
                    if (gr.get(managerId)) {
                        chainArray.push(gr.getDisplayValue('name')); 
                    } else {
                        break; 
                    }
                }
            }
            
            if (chainArray.length === 0) {
                return 'No managers found'; 
            }
            return chainArray.join(' → '); 
        }
    });`
})