export class Api {
    public static getEndPoint(value: string) {
        let base = 'http://local.api.angular-intranet.me/api/v1/';
        var data = {
            'projects': 'projects',
            'clients': 'clients'
        };
        return base + data[value];
    }
}
