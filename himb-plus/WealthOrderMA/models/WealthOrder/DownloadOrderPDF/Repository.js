define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function DownloadOrderPDFRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	DownloadOrderPDFRepository.prototype = Object.create(BaseRepository.prototype);
	DownloadOrderPDFRepository.prototype.constructor = DownloadOrderPDFRepository;

	//For Operation 'generatePDF' with service id 'generatePDF1504'
	DownloadOrderPDFRepository.prototype.generatePDF = function(params, onCompletion){
		return DownloadOrderPDFRepository.prototype.customVerb('generatePDF', params, onCompletion);
	};

	return DownloadOrderPDFRepository;
})