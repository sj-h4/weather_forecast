//以下のURLはいずれも京都市のもの

//気象庁
function jma() {
  var url = "https://www.jma.go.jp/jp/yoho/333.html";
  var response = UrlFetchApp.fetch(url);
  var html = response.getContentText('UTF-8');
 
  var prob_html = Parser.data(html).from('<table class="rain">').to('</table>').build();
 
  Logger.log(prob_html);
 
  var prob_list = Parser.data(prob_html).from('<td align="right">').to('</td>').iterate();
 
  var text = '気象庁\n' + '6~12: ' + prob_list[1] + '\n12~18: ' + prob_list[2] + '\n18~24: ' + prob_list[3] + '\n';
  
  return text;
}


//ウェザーニュース
function weathernews() {
  var url = 'https://weathernews.jp/onebox/35.050126/135.787960/q=%E4%BA%AC%E9%83%BD%E5%B8%82%E5%B7%A6%E4%BA%AC%E5%8C%BA&v=f755dcb3f2c5eb660e33d08c2f6361a752e096e0c95ed7094a524287b7e0b0b1&lang=ja';
  var response = UrlFetchApp.fetch(url);
  var html = response.getContentText('UTF-8');
  
  var prob_html = Parser.data(html).from('<div class="cont">').to('</div>').build();
  var prob_list = Parser.data(prob_html).from('<td>').to('</td>').iterate();
  
  Logger.log(prob_list);
  
  var text = 'ウェザーニュース\n' + '6~12: ' + prob_list[1] + '\n12~18: ' + prob_list[2] + '\n18~24: ' + prob_list[3] + '\n';
  
  return text;
}


//yahoo天気
function yahoo() {
  var url = 'https://weather.yahoo.co.jp/weather/jp/26/6110.html';
  var response = UrlFetchApp.fetch(url);
  var html = response.getContentText('UTF-8');
  
  var prob_html = Parser.data(html).from('<tr class="precip">').to('</tr>').build();
  var prob_list = Parser.data(prob_html).from('<td>').to('</td>').iterate();
  
  Logger.log(prob_list);
  
  var text = 'Yahoo!天気\n' + '6~12: ' + prob_list[1] + '\n12~18: ' + prob_list[2] + '\n18~24: ' + prob_list[3] + '\n';
  
  return text;
}

//LINE Notifyで送信
function send_message(content) {
  const TOKEN = ['YOUR LINE NotifyTOKEN'];
  var options = {
     "method" : "post",
     "payload" : {"message" : content},
     "headers" : {"Authorization" : "Bearer "+ TOKEN}
  };
  
  UrlFetchApp.fetch("https://notify-api.line.me/api/notify", options);
}


//実行
function main() {
  var prob_jma = jma();
  var prob_weathernews = weathernews();
  var　text = '今日の降水確率\n' + '\n' + jma() + '\n' + weathernews() + '\n' + yahoo();
  
  send_message(text);
}
