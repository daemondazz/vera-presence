# Vera Presence Sensor

This is the Vera  PresenceScanner plugin for reporting presence based on detection
of Bluetooth and iBeacon.  This works in conjunction with the the scanner that runs
on an RPi.  The compatible scanner code and instructions are found at:
https://github.com/daemondazz/vera-presence-scanner

## Installation

This plugin is under initial development and is not yet available on the MiOS
Marketplace (app portal for Vera).  As a result, it must be manually installed.
The manual install requires a certain level of skill and uses ssh and scp.  This
will be eliminated when the first release occurs in the (hopefully) not-too-distant
future.  Here are the steps:

    1) on your PC, copy all files from this Github repo
	   (https://github.com/daemondazz/vera-presence)
	2) on the Vera UI, go to Apps|Develop Apps|Luup files
	3) on the right hand column, browse for each of the 7 required files
	   (.xml and .json but NOT .png)
	4) click on Restart Luup after upload
	5) click on GO
	6) scp the three jpg files to /etc/cmh-ludl.  For example for Windows PC:
	   pscp -scp <path on PC>/PresenceSensor.png root@<ip of Vera>:/etc/PresenceSensor.png
	   pscp -scp <path on PC>/PresenceSensor_0.png root@<ip of Vera>:/etc/PresenceSensor_0.png
	   pscp -scp <path on PC>/PresenceSensor_100.png root@<ip of Vera>:/etc/PresenceSensor_100.png
    7) log on the Vera using ssh
    8) create symlinks for the 3 jpeg files as follows
	   ln -s /etc/cmh-ludl/PresenceSensor.png /www/cmh/skins/default/icons/PresenceScanner.png
	   ln -s /etc/cmh-ludl/PresenceSensor_0.png /www/cmh/skins/default/icons/PresenceScanner_0.png
	   ln -s /etc/cmh-ludl/PresenceSensor_100.png /www/cmh/skins/default/icons/PresenceScanner_100.png

Now that the Vera software is installed, configure the RPi per instructions at 
https://github.com/daemondazz/vera-presence-scanner

## Creating Devices

To create a new bluetooth device in Vera, here are the steps:

	1) on the Vera UI, go to Apps|Develop Apps|Create device
	2) for Upnp Device Filename, enter D_PresenceScanner.xml (case sensitive)
	3) for Description, type in the name of this device (e.g. Bob's iPhone)
	4) click on Create device
	5) click on Reload in the upper right
	
To configure the device, open the device in the UI and select the Settings tab.
Enter the bluetooth address of the device and specify whether it is a simple
bluetooth device (phone, tablet etc.) or an iBeacon.  Save the changes.

You can enter notifications in the same way for any other device on the
Notifications tab.

After configuring the device, ssh into the RPi and restart the scanner as follows:
    sudo systemctl restart bluetooth-scanner.service

## Upgrading

To upgrade to the lastest version, download the files from Github and upload the xml and json using the UI.
Upload the .png using scp.  There is no need to do the other steps (create links).

