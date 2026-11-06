import { gs, type GlideRecord } from '@servicenow/glide'

 const showStateUpdate=(current: GlideRecord, previous: GlideRecord)=> {
    const currentState = current.getValue('state')
    const previousState = previous.getValue('state')
    console.log(`state updated from "${previousState}" to "${currentState}"`)
    gs.addInfoMessage(`state updated from "${previousState}" to "${currentState}"`)
}
