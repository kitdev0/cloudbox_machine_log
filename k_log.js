//Developer:kham iTech//
//Date:2017-05-04     //

var fs = require('fs');
// define(Savetofile,1);
// define(Savetofile,1);
define_log_level_max=5;
define_log_config={savetofile:false,print:true};

var log_level_number=1;
var log_config=[];
var log_delimiter=" ";

exports.myDateTime = function () {
    return Date();
};
exports.config = function (config) {
    if(!isNon(config.level))log_level_number=config.level;
    if(!isNon(config.delimiter))log_delimiter=config.delimiter;
    if(config.level>0 && config.level<define_log_level_max){
        log_config=config.level_config;

        // for(var l=0;l<level_number;l++){
        //     if(!log_config.hasOwnProperty(l)){
        //         log_config[l]=define_log_config;
        //     }
        // }
        // for(var l in config){
        //     if(log_config.hasOwnProperty(l)){console.log(l);
        //         for(var k in config[l]){
        //             if(log_config[l].hasOwnProperty(k)){console.log(k,log_config[l][k],config[l][k]);
        //                 log_config[l][k]=config[l][k];console.log(k,log_config[l][k],config[l][k]);
        //             }
        //         }
        //     }
        // }
// console.log(config);
        start();
        return true;
    }else{
        return false;
    }
    
};
exports.getConfig=function(){
    return log_config;
};
exports.push=function(level){
    // console.log("l",l);
    // console.log(parseInt(l));
    if(!isNon(parseInt(level)) && level>=0 && level<log_config.length){
        var d = new Date();
        // console.log(d.getUTCMonth());
        // var str=d.getFullYear()+'-'+pad(d.getMonth()+1,2)+'-'+pad(d.getDate(),2)+' '+d.getHours()+':'+pad(d.getMinutes(),2)+':'+pad(d.getSeconds(),2)+'.'+pad(d.getMilliseconds(),3)+' ';
        var str=pad(d.getHours(),2)+':'+pad(d.getMinutes(),2)+':'+pad(d.getSeconds(),2)+'.'+pad(d.getMilliseconds(),3)+' ';
        var filename=d.getFullYear()+''+pad(d.getMonth()+1,2)+''+pad(d.getDate(),2);

        for (i = 1; i < arguments.length; i++){
            // console.log(typeof arguments[i]);
            if(typeof arguments[i] =='object'){
                str+=JSON.stringify(arguments[i])+log_delimiter;
            }else{
                str+=arguments[i]+log_delimiter;
            }
        }
        if(!isNon(log_config[level].print)&&log_config[level].print){
            console.log(str);
        }
        if(!isNon(log_config[level].savetofile)&&log_config[level].savetofile){
            //console.log('f ',str);
            // fs.
            fs.appendFile('/media/sdcard/log/log'+filename+'.txt', str+'\r\n', function (err) {
                if (err) throw err;
                //console.log('Saved!');
            });
        }
    }else{
        return false
    }
};
function start(){
    var d = new Date();
    var filename=d.getFullYear()+''+pad(d.getMonth()+1,2)+''+pad(d.getDate(),2);
    fs.appendFile('/media/sdcard/log/log'+filename+'.txt', '\r\n', function (err) {
        if (err) throw err;
        //console.log('Saved!');
    });
}
function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}
function isNon(_obj){return _obj===undefined?true:false;}
function isNull(_obj){return _obj===null?true:false;}
