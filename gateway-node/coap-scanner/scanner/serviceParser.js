/**
 * Created by rui on 2/17/17.
 */
// let exampleAdvertisingString = "/sensor/temperature:number,/actuator/led:boolean,/sensor/fire:number,";
// create a Device Object

let createDevice = function ( ipAddress, name, description, servicesString ) {
    let endpoints = servicesString.split(',');
    let newDevice = {
        name: name,
        description: description,
        ipAddress: ipAddress,
        sensorList: {},
        actuatorList: {}
    };

    for (let i = 0; i < endpoints.length - 1; i++) {
        let serviceType = endpoints[i].split('/')[1],
            serviceName = endpoints[i].split('/')[2].split(':')[0],
            servicePath = endpoints[i].split(':')[0],
            serviceDataFormat = endpoints[i].split(':')[1];

        let sensorIndex = 0,
            actuatorIndex = 0;

        switch (serviceType){

            case("sensor"):
                let newSensor = {
                    index: sensorIndex++,
                    name: serviceName,
                    path: servicePath,
                    status: "null",
                    dataFormat: serviceDataFormat
                };

                newDevice.sensorList[serviceName] = newSensor;
                break;

            case("actuator"):
                let newActuator = {
                    index: actuatorIndex++,
                    name: serviceName,
                    path: servicePath,
                    status: "null",
                    dataFormat: serviceDataFormat
                };

                newDevice.actuatorList[serviceName] = newActuator;
                break;

            default:
                console.log("cannot recognize the service " + servicePath);
                break;
        }
    }

    return newDevice;
};

module.exports = {
    createDevice: createDevice
};
