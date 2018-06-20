function myFunction1() {
  
  var folders = [
    {"id":"Folder-id-1","name":"Folder1","path":"/aristotle","selected":true},
    {"id":"Folder-id-2","name":"Folder2","path":"/files testing","selected":false},
    {"id":"Folder-id-3","name":"Folder3","path":"/Documents from citriks","selected":true}
  ];
  var card = CardService.newCardBuilder().setHeader(CardService.newCardHeader().setTitle('ex'));
  var section = CardService.newCardSection();
  
  for(var i=0;i<folders.length;i++) {
    var f = folders[i];
    var action = CardService.newAction().setFunctionName('selectionChnageAction').setParameters({folder : JSON.stringify(f)});
    var switchButton = CardService.newSwitch().setFieldName('selected_folder_ids').setOnChangeAction(action).setSelected(f.selected).setValue(f.id);
    section.addWidget(CardService.newKeyValue().setContent(f.name).setSwitch(switchButton));
    section.addWidget(CardService.newSelectionInput().addItem(f.name, f.id, f.selected).setFieldName("selected_folder_selection").setTitle("selection"));
  }
  
   var action = CardService.newAction().setFunctionName('getNewCard');
   section.addWidget(CardService.newTextButton().setOnClickAction(action).setText('click to see text'));
  
  card.addSection(section);
  return card.build();
  
}

function selectionChnageAction(e) {
  console.info('selectionChnageAction e-->%s', JSON.stringify(e));
  var selectedFolders = e.formInputs.selected_folder_ids;
  console.info('selectedFolders-->%s', selectedFolders);
}

function textCard(count){

  count = count || 0;
  var card = CardService.newCardBuilder().setHeader(CardService.newCardHeader().setTitle('ex'));
  var section = CardService.newCardSection();
  
  var searchInput = CardService.newTextInput().setTitle('Search input').setFieldName('search_input');
  
  console.info("count-> %s", count);
  
  searchInput.setValue(count);
  
  section.addWidget(searchInput);
  
  var action = CardService.newAction().setFunctionName('getNewCard');
  section.addWidget(CardService.newTextButton().setOnClickAction(action).setText('Click'));
  
  card.addSection(section);
  
  return card.build();
//  return CardService.newActionResponseBuilder().setNavigation(CardService.newNavigation().pushCard(card.build())).build();
}

function getNewCard(e) {
    var count = parseInt(e.formInput.search_input || "0");
//    console.info('setting value->%s for key->%s', 'textInNewCard', 'text');
    var card = textCard(count + 1);
    return CardService.newActionResponseBuilder().setNavigation(CardService.newNavigation().updateCard(card)).build();

}


