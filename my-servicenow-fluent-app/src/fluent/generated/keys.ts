import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    bom_json: {
                        table: 'sys_module'
                        id: '7615a706de8b42b28dbc64768fda8f5f'
                    }
                    br_log_worknotes: {
                        table: 'sys_script'
                        id: 'b477e726d9894011935ea26096afac18'
                        deleted: false
                    }
                    br0: {
                        table: 'sys_script_client'
                        id: 'ed5065ca2145440d94eeafd654b7dbd1'
                        deleted: true
                    }
                    cs_category_autofill: {
                        table: 'sys_script_client'
                        id: '6700114c99fb430791127c2e2fffe06c'
                    }
                    cs_urgency_alert: {
                        table: 'sys_script_client'
                        id: 'd595b8780c2549ff8dbc5819c894a958'
                    }
                    cs0: {
                        table: 'sys_script_client'
                        id: '6a29f60e3d55426aaaf201ba180a073c'
                        deleted: true
                    }
                    package_json: {
                        table: 'sys_module'
                        id: 'cb0bd56bddd24b5597f4ee076abf1f6f'
                    }
                    src_server_script_ts: {
                        table: 'sys_module'
                        id: 'ceb638c1f2d145ceab28ee1b835e10c9'
                    }
                }
            }
        }
    }
}
