define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function DashboardRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	DashboardRepository.prototype = Object.create(BaseRepository.prototype);
	DashboardRepository.prototype.constructor = DashboardRepository;

	//For Operation 'getRecentActivity' with service id 'getRecentActivityOrch6268'
	DashboardRepository.prototype.getRecentActivity = function(params, onCompletion){
		return DashboardRepository.prototype.customVerb('getRecentActivity', params, onCompletion);
	};

	//For Operation 'getBankDate' with service id 'getBankDate6134'
	DashboardRepository.prototype.getBankDate = function(params, onCompletion){
		return DashboardRepository.prototype.customVerb('getBankDate', params, onCompletion);
	};

	//For Operation 'getAssetList' with service id 'getAssetList9480'
	DashboardRepository.prototype.getAssetList = function(params, onCompletion){
		return DashboardRepository.prototype.customVerb('getAssetList', params, onCompletion);
	};

	//For Operation 'getWealthDashboard' with service id 'getWealthDashboard2100'
	DashboardRepository.prototype.getWealthDashboard = function(params, onCompletion){
		return DashboardRepository.prototype.customVerb('getWealthDashboard', params, onCompletion);
	};

	//For Operation 'getDashboardGraph' with service id 'getDashboardGraph3213'
	DashboardRepository.prototype.getDashboardGraph = function(params, onCompletion){
		return DashboardRepository.prototype.customVerb('getDashboardGraph', params, onCompletion);
	};

	//For Operation 'getDashboardRecentActivity' with service id 'getDashboardRecentActivity1809'
	DashboardRepository.prototype.getDashboardRecentActivity = function(params, onCompletion){
		return DashboardRepository.prototype.customVerb('getDashboardRecentActivity', params, onCompletion);
	};

	//For Operation 'getPortfolioList' with service id 'getPortfolioList1425'
	DashboardRepository.prototype.getPortfolioList = function(params, onCompletion){
		return DashboardRepository.prototype.customVerb('getPortfolioList', params, onCompletion);
	};

	//For Operation 'getDashboardGraphData' with service id 'getDashboardGraphData8227'
	DashboardRepository.prototype.getDashboardGraphData = function(params, onCompletion){
		return DashboardRepository.prototype.customVerb('getDashboardGraphData', params, onCompletion);
	};

	return DashboardRepository;
})