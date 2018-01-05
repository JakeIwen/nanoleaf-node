var AuroraApi = require('nanoleaf-aurora-client')

var NanoLeaf = new AuroraApi({
    host: '192.168.1.21',
    base: '/api/v1/',
    port: '16021',
    accessToken: 'dCTYWIj8cjU2okrY0E5hSzCh6F8Hj3sM'
  });


cycleEffects({minuteInterval: process.argv[2] || 20, hasRhythm: process.argv[3] || false})

console.log(process.argv[2]);

function cycleEffects({minuteInterval, hasRhythm}) {
  NanoLeaf.getInfo().then(info => {
    let list = JSON.parse(info).effects.effectsList
    setNextEffect(list, hasRhythm)
    setInterval(() => setNextEffect(list, hasRhythm), 1000*60*minuteInterval)
    console.log('Device info: ' + JSON.stringify(JSON.parse(info), null,2) )
  })
}

function setNextEffect(list, hasRhythm) {

  NanoLeaf.getInfo().then(currentInfo => {
    let currentEffect = JSON.parse(currentInfo).effects.select
    let newEffect = list[list.indexOf(currentEffect) + 1] || list[0]

    NanoLeaf.setEffect(newEffect).then(() => {
      console.log({newEffect})
      NanoLeaf.getInfo().then(newInfo => {
        let rhythmIsActive = JSON.parse(newInfo).rhythm.rhythmActive
        if (rhythmIsActive!==(!!hasRhythm)) setNextEffect(list, hasRhythm)
      })
    })

  })
}


// // get token
//
// const request = require('request');
//
// const nanoleafHost = '192.168.1.21:16021';
// let requestTokenOptions = {
//     method: 'POST',
//     url: 'http://' + nanoleafHost + '/api/beta/new',
// };
//
// console.log('Holding the on-off button down for 5-7 seconds until the LED starts flashing in a pattern ');
//
// request(requestTokenOptions, function(error, response, body) {
//     if (error) {
//       console.log('Error: ' + error);
//       return;
//     }
//
//     console.log('response', response.body);
// });
//


  //
