function onOpen() {
  var ui = SpreadsheetApp.getUi();
  // Or DocumentApp or FormApp.
  ui.createMenu('Run Scripts')

      
          
          .addItem('email', 'newChart')
                 
      .addToUi();
}
 function emailCharts(sheet,emails,emailSubject){
var targetspreadsheet = SpreadsheetApp.getActiveSpreadsheet(); // Active        spreadsheet of the key file
var sheet = targetspreadsheet.getSheetByName('chart'); // Change the sheet name 
var emailSubject = 'test';
var emails = 'drpync@gmail.com'; // your email ID
var charts = sheet.getCharts();


if(charts.length==0){
MailApp.sendEmail({
to: emails,
subject: "ERROR:"+emailSubject,
htmlBody: "No charts in the spreadsheet"});    
return;
}

var chartBlobs=new Array(charts.length); 
var emailBody="Charts<br>";
var emailImages={};
for(var i=0;i<charts.length;i++){
var builder = charts[i].modify();
builder.setOption('vAxis.format', '#');
var newchart = builder.build();
chartBlobs[i]= newchart.getAs('image/png');
emailBody= emailBody + "<p align='center'><img src='cid:chart"+i+"'></p>";
emailImages["chart"+i]= chartBlobs[i];
}

MailApp.sendEmail({
to: emails,
subject: emailSubject,
htmlBody: emailBody,
inlineImages:emailImages});
}