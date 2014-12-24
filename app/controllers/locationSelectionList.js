var args = arguments[0] || {};
function onLocationSelected(e){
	
	Ti.API.info('triggering .locselected-rowdata' + JSON.stringify(e.rowData));
	//Ti.API.info('triggering .locselected' + JSON.stringify(e.row));
	var addrSelLocObj=JSON.parse(JSON.stringify(e.rowData));//_e.rowData  
	Ti.App.fireEvent('locselected',{'data':addrSelLocObj});
	$.locationSelectionList.close();
}
 exports.setTableViewData = function(_tableData){
	$.locListTableView.setData(_tableData);
	Ti.API.info('exports.setTableViewData');
};
