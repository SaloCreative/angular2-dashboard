export class Api {
    public static getEndPoint(value: string) {
        let base = 'http://local.api.angular-intranet.me/api/v1/';
        var data = {
            'projects'      : 'projects',
            'project'       : 'project/',
            'projectMeta'   : 'projectsmeta',
            'clients'       : 'clients',
            'client'        : 'client/'
        };
        return base + data[value];
    }
}
