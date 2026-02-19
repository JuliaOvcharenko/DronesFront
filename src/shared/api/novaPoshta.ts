const API_URL = 'https://api.novaposhta.ua/v2.0/json/';
const API_KEY = '4c5375dec19a06c1c38294aae718e9be'; // ключ

export interface City {
    Description: string;
    Ref: string;
    AreaDescription: string;
}

export interface Warehouse {
    Description: string;
    Ref: string;
    Number: string;
    CategoryOfWarehouse: string;
}

export const searchCity = async (cityName: string): Promise<City[]> => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify({
                apiKey: API_KEY,
                modelName: 'Address',
                calledMethod: 'searchSettlements',
                methodProperties: {
                    CityName: cityName,
                    Limit: '50',
                    Page: '1'
                }
            })
        });
        
        const data = await response.json();
        
        if (data.success && data.data && data.data.length > 0) {
            return data.data[0].Addresses.map((item: any) => ({
                Description: item.Present,
                Ref: item.DeliveryCity,
                AreaDescription: item.Area
            }));
        }
        return [];
    } catch (error) {
        console.error("NP Error:", error);
        return [];
    }
};

export const getWarehouses = async (cityRef: string): Promise<Warehouse[]> => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify({
                apiKey: API_KEY,
                modelName: 'Address',
                calledMethod: 'getWarehouses',
                methodProperties: {
                    CityRef: cityRef,
                    Limit: '500' 
                }
            })
        });

        const data = await response.json();
        if (data.success) {
            //мапимо, щоб розрізняти поштомати
            return data.data.map((item: any) => ({
                Description: item.Description,
                Ref: item.Ref,
                Number: item.Number,
                CategoryOfWarehouse: item.CategoryOfWarehouse // "Postomat" або інші
            }));
        }
        return [];
    } catch (error) {
        console.error("NP Error:", error);
        return [];
    }
};