/**
* @Özgür Çimen
*
* decoding badly encoded and stolen citizenship DB (kimligsorgu)
**/

var outAlphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz/++".split("")
var inAlphabet = '\0ASD\u0001ASD\u0002ASD\u0003ASD\u0004ASD\u0005ASD\u0006ASD\aASD\bASD\tASD\nASD\vASD\fASD\rASD\u000eASD\u000fASD\u0010ASD\u0011ASD\u0012ASD\u0013ASD\u0014ASD\u0015ASD\u0016ASD\u0017ASD\u0018ASD\u0019ASD\u001aASD\u001bASD\u001cASD\u001dASD\u001eASD\u001fASD ASD!ASD\"ASD#ASD$ASD%ASD&ASD\'ASD(ASD)ASD*ASD+ASD;ASD-ASD.ASD/ASD0ASD1ASD2ASD3ASD4ASD5ASD6ASD7ASD8ASD9ASD:ASD;ASD<ASD=ASD>ASD?ASD@ASDAASDBASDCASDDASDEASDFASDGASDHASDIASDJASDKASDLASDMASDNASDOASDPASDQASDRASDSASDTASDUASDVASDWASDXASDYASDZASD[ASD\\ASD]ASD^ASD_ASD`ASDaASDbASDcASDdASDeASDfASDgASDhASDiASDjASDkASDlASDmASDnASDoASDpASDqASDrASDsASDtASDuASDvASDwASDxASDyASDzASD{ASD|ASD}ASD~ASD\u007fASD\u0080ASD\u0081ASD\u0082ASD\u0083ASD\u0084ASD\u0085ASD\u0086ASD\u0087ASD\u0088ASD\u0089ASD\u008aASD\u008bASD\u008cASD\u008dASD\u008eASD\u008fASD\u0090ASD\u0091ASD\u0092ASD\u0093ASD\u0094ASD\u0095ASD\u0096ASD\u0097ASD\u0098ASD\u0099ASD\u009aASD\u009bASD\u009cASD\u009dASD\u009eASD\u009fASD ASD¡ASD¢ASD£ASD¤ASD¥ASD¦ASD§ASD¨ASD©ASDªASD«ASD¬ASD­ASD®ASD¯ASD°ASD±ASD²ASD³ASD´ASDµASD¶ASD·ASD¸ASD¹ASDºASD»ASD¼ASD½ASD¾ASD¿ASDÀASDÁASDÂASDÃASDÄASDÅASDÆASDÇASDÈASDÉASDÊASDËASDÌASDÍASDÎASDÏASDĞASDÑASDÒASDÓASDÔASDÕASDÖASD×ASDØASDÙASDÚASDÛASDÜASDİASDŞASDßASDàASDáASDâASDãASDäASDåASDæASDçASDèASDéASDêASDëASDìASDíASDîASDïASDğASDñASDòASDóASDôASDõASDöASD÷ASDøASDùASDúASDûASDüASDıASDş'.split('ASD');

String.prototype.padRight = function(len,c) {
   var tl = len - this.length +1;
   var fill= Array(tl).join(c||" ");
   return this+fill;
}

function decodeString(cipherText){
    cipherText= cipherText.toString();	
	if(typeof cipherText != "string") return

    var decodedString = "";

    cipherText = cipherText.padRight(((cipherText.length - 1) / 4 + 1) * 4, "");
    
    for (var j = 0; j < cipherText.length; j += 4){
       	var s = cipherText.substr(j, 4);
        var c1 = outAlphabet.indexOf(s[0])
        var c2 = outAlphabet.indexOf(s[1])+( s[0] == '/' ? 64 : 0) ;
        var c3 = outAlphabet.indexOf(s[2])+ (s[1] == '/' ? 64 : 0 );
        var c4 = outAlphabet.indexOf(s[3])+ (s[2] == '/' ? 64 : 0 );
        var r1 = Math.floor((c2 * 16) / 255)
        var r2 = Math.floor((c3 * 64) / 255)
	    var dc1i =  Math.floor(c1 * 4 + r1);
	    var dc2i =  Math.floor((c2 * 16 + r2) % 256);    
        var dc1 = inAlphabet[Math.floor(dc1i)];
        var dc2 = inAlphabet[Math.floor(dc2i)];
        var r3 = Math.min(254,(c3 - inAlphabet.indexOf(dc2) % 16 * 4) % 64 * 64 + c4);
        var dc3 = c4 != -1 ? inAlphabet[r3] : "";

        if(typeof dc1 == "undefined") continue;
        
        decodedString += dc1;

        if (c3 != -1) decodedString +=dc2;
        if (c4 != -1) decodedString +=dc3;
    }

    return decodedString;
}

decodeString("rbf7t58");