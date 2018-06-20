function main(e) {
  myFunction();
  GmailApp.setCurrentMessageAccessToken(e.messageMetadata.accessToken);
  
  var currentMssg = GmailApp.getMessageById(e.messageMetadata.messageId);
  var thread = currentMssg.getThread();
  var mssgs = thread.getMessages();
  
  var cb = CardService.newCardBuilder();
  
  cb.setHeader(CardService.newCardHeader().setTitle('mails of "' + thread.getFirstMessageSubject() + '"'));
  
  R.forEach(function(ca) { cb.addCardAction(ca); }, getCardActions());
  
  
  var section = CardService.newCardSection();
  
  var draft = R.find(function(m) { return m.isDraft(); }, mssgs);

  var action = CardService.newAction().setFunctionName("actionName");
  
  var whitespaces = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  section.addWidget(CardService.newTextButton().setText(whitespaces + "button" + whitespaces).setOnClickAction(action));
  
  var selected = false;
  var sw = CardService.newSwitch().setOnChangeAction(action).setSelected(selected).setFieldName('abc');
  
  if(draft) {
    console.info("body-> %s", draft.getBody());
    console.info("raw content-> %s", draft.getRawContent());
    console.info("plain body-> %s", draft.getPlainBody());
    section.addWidget(CardService.newKeyValue().setContent(draft.getRawContent()));
  }
  else section.addWidget(CardService.newKeyValue().setContent("<font color='#'>      &nbsp;&nbsp;&nbsp;  &nbsp;No draft").setOnClickAction(action));
  
//  for(var i=0;i<mssgs.length;i++) {
//    var m = mssgs[i];
//    section.addWidget(CardService.newKeyValue().setContent(m.getBody()));
//  }
  
  section.addWidget(CardService.newKeyValue().setContent('switch').setSwitch(sw));
  cb.addSection(section);
  
  return cb.build();
}

function getCardActions() {
  var action = CardService.newAction().setFunctionName("main");
  var ca = CardService.newCardAction().setText("Refresh").setOnClickAction(action);
  
  return [ca];
}
