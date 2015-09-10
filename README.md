# jastyleet-toolchain
Gulp toolchain for creating a wordpress theme using jade-php and stylus (with jeet, rupture and kouto-swiss).
Browser-sync is included for ease of developing. The resulting *.php files are automatically prettified using
gulp-prettify.

# Setup


Assuming you already got a LAMP/MAMP/WAMP stack with wordpress installed:

1.  Open the command line and navigate to where you downloaded jastyleet-toolchain
2.  Type ```npm install```
2.  Open ```gulpfile.js``` and change these 3 lines to match your project setup:
    (Check your stack's manual for the localhost directory - this is the folder where all your web-facing files go)
  
```javascript
    var htdocsPath = 'C:/xampp/htdocs/';  //this is where your lamp/mamp/wamp stack has it's localhost
                                          //directory, depending on what stack you use it could
                                          //be something like "C:/wamp/www/" too
    var wpInstallName = 'wordpress4';     //the subfolder within your 'htdocs' where wordpress is installed
    var themeName = 'jastyleet';          //this is the name of your theme folder
```
## Example:
Let's say you installed wordpress into

```
C:/xampp/htdocs/wordpress
```

and your theme is in

```
C:/xampp/htdocs/wordpress/wp-content/themes/your_theme_name
```

you would change the 3 lines in gulpfile.js to:
```javascript
var htdocsPath = 'C:/xampp/htdocs/';
var wpInstallName = 'wordpress';
var themeName = 'your_theme_name';
```
# Usage
To use the toolchain simply type ```gulp serve``'.

This will open a your offline wordpress site in a synced browser window/tab and silently watch all *.styl and *.jade files
for changes and autocompile them.
    


