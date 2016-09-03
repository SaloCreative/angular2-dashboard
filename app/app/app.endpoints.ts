export class Api {
    public static getEndPoint(value: string) {
        let base = 'local.api.intranet2.freshleafmedia.co.uk/api/v1/';
        var data = {
            'projects': 'projects',
            'clients': 'clients'
        };
        return base + data[value];
    }
}
