var AuroraApi = require('nanoleaf-aurora-client')

var NanoLeaf = new AuroraApi({
    host: '192.168.1.21',
    base: '/api/v1/',
    port: '16021',
    accessToken: ''
  });


cycleEffects({minuteInterval: 2, rhythm: true})

function cycleEffects({minuteInterval, rhythm}) {
  NanoLeaf.getInfo().then(info => {
    let list = JSON.parse(info).effects.effectsList
    setNextEffect(list, rhythm)
    setInterval(() => setNextEffect(list, rhythm), 1000*60*minutes)
    console.log('Device info: ' + JSON.stringify(JSON.parse(info), null,2) )
  })
}

function setNextEffect(list, rhythm) {

  NanoLeaf.getInfo().then(currentInfo => {
    let currentEffect = JSON.parse(currentInfo).effects.select
    let newEffect = list[list.indexOf(currentEffect) + 1] || list[0]

    NanoLeaf.setEffect(newEffect).then(() => {
      console.log({newEffect})
      NanoLeaf.getInfo().then(newInfo => {
        let rhythmIsActive = JSON.parse(newInfo).rhythm.rhythmActive
        if (rhythmIsActive!==rhythm) setNextEffect(list, rhythm)
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
