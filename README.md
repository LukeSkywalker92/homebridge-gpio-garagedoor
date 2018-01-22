# homebridge-gpio-garagedoor
[RPi](https://www.raspberrypi.org) GPIO based Garage Door plugin for [Homebridge](https://github.com/nfarina/homebridge)

# Installation

1. Install Raspbian (add empty file ssh and wpa_supplicant.conf to boot folder)
2. Install NodeJS using: `curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -` and `sudo apt install nodejs`
3. Install `sudo apt-get install libavahi-compat-libdnssd-dev`
4. Install homebridge using: `sudo npm install -g --unsafe-perm homebridge`
5. Run `sudo npm install --unsafe-perm mdns` and `sudo npm rebuild --unsafe-perm` at `/usr/local/lib/node_modules/homebridge`
6. Install this plugin using: `npm install -g git+https://github.com/LukeSkywalker92/homebridge-gpio-garagedoor.git`
7. Update your configuration file. See sample config.json snippet below. 


# wpa_supplicant.conf

```
# Datei wpa_supplicant.conf in der Boot-Partition (Raspbian Stretch)
country=DE  #omit if US
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
network={
       ssid="wlan-bezeichnung"
       psk="passwort"
       key_mgmt=WPA-PSK
}
```

# NodeJS Installation on RPi Zero

```
wget https://nodejs.org/dist/latest-v6.x/node-v6.10.0-linux-armv6l.tar.gz
tar -xvf node-v6.10.0-linux-armv6l.tar.gz
cd node-v6.10.0-linux-armv6l
sudo cp -R * /usr/local/
```

# Configuration

Configuration sample:
```
{
    "bridge": {
        "name": "Homebridge",
        "username": "CC:22:3D:E3:CE:30",
        "port": 51826,
        "pin": "246-92-505"
    },
    
    "description": "Garagentor"

 "accessories": [
        {
                "accessory": "GPIOGarageDoor",
                "name": "Garagentor",
                "doorSwitchPin": 23,
                "doorSensorPin": 24,
                "isNCSensor": true,
                "doorOpensInSeconds": 25
        }
   ]

}
```
Fields: 

* "accessory": Must always be "GPIOGarageDoor" (required)
* "name": Can be anything (required)
* "doorSwitchPin": GPIO pin that is used to trigger the garage door switch (required)
* "doorSensorPin": GPIO pin that is used to detect if the state of the garage door (required)
* "isNCSensor": Specifies whether the door sensor is a Normally Closed (NC) type or Normally Open (NO) type (optional, default false NO)
* "doorOpensInSeconds": Number of seconds for the garage door to open completely (required)
