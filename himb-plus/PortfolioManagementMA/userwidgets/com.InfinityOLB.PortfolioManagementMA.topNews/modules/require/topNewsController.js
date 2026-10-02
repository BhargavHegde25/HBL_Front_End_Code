define(['ViewConstants','CommonUtilities'], function(ViewConstants,CommonUtilities) {

	return {
        init: function(){
           this.view.segNews.onRowClick = this.onSegmentRowClick.bind(this);
        },
		loadMarketNews: function(data1) {
          var scope = this;  
          var navMan = applicationManager.getNavigationManager();
          var data = navMan.getCustomInfo('frmTopNews');
          var StockNews = data.stock;
          var allNews;
          
          if (StockNews === true) {
              allNews = data1.stockNewsDetails;
              this.view.lblTopNews.text = CommonUtilities.changedataCase(kony.i18n.getLocalizedString("i18n.wealth.stockNews"));
          }
          else {
              allNews = data1.GetSummaryByTopic_Response_1.StoryMLResponse.STORYML.HL;
              this.view.lblTopNews.text = CommonUtilities.changedataCase(kony.i18n.getLocalizedString("i18n.wealth.topNews"));
          }
          
          var results = [];  
          var dateNews;
          for (var news in allNews) {
              dateNews = applicationManager.getFormatUtilManager().getDateObjectfromString(((StockNews === true) ? allNews[news].RT : allNews[news].LT)).toString().split('(');             

              var time = dateNews[0].split(" ")[4].split(":");

              var firstHalf = dateNews[0].split(' ')[2] + ' ' + dateNews[0].split(' ')[1] + ', ' + dateNews[0].split(' ')[3] + ', '+ applicationManager.getFormatUtilManager().getTwelveHourTimeString(time[0]+':'+time[1]);          
              var secondHalf = "";        
              dateNews[1].split(" ").map(function(elem) {
                  for (let i = 0; i <= elem.length-1; i++) {
                    secondHalf = secondHalf + elem[i].charAt(i);
                    return elem[i].charAt(i);
                  }
              });       

              var maxlength = 100;
              var newsText = allNews[news].TE.replace(/<pre>|<\/pre>/g, '');
              let shortDesc= newsText;
              if (newsText.length > maxlength) {
                shortDesc=newsText.substr(0, maxlength) + '...';
              }

              var storeData={
                Headline: allNews[news].HT,
                HeadTime: allNews[news].PR + " | " + firstHalf + ", " + secondHalf,
                ID: allNews[news].ID,
                shortNews: shortDesc,
                detailedNews: newsText,
                description: shortDesc,
                lblShowMore: CommonUtilities.changedataCase(kony.i18n.getLocalizedString("i18n.wealth.showMore")),
                imgShowMore: "arrow_down.png",
                isRowClicked: false,
                showMore: {
                    "onClick": function(event, context){
                        scope.onSegmentRowClick(event, context);
                    }.bind(this)
                },
                flxSeparator:{
              "isVisible" : (news < allNews.length-1)

            }
              };
              results.push(storeData);
          }
          
          this.view.segNews.widgetDataMap = {
            lblContent1: "Headline",
            lblName: "HeadTime",
            tbxContent2: "description",
            flxButton :"showMore",
            imgDownArrow: "imgShowMore",
            lblShowMore :"lblShowMore",
            flxSeparator: "flxSeparator"
          };
          
          this.view.segNews.setData(results); 
        },
		onSegmentRowClick: function(event, context){
          var length = this.view.segNews.data.length;
          var rowindex = context.rowIndex;
          var data = this.view.segNews.data;

          for(i=0;i<length;i++) {
            if (i !== rowindex) {
              data[i].description =  data[i].shortNews;
              data[i].isRowClicked = false;
              data[i].lblShowMore = CommonUtilities.changedataCase(kony.i18n.getLocalizedString("i18n.wealth.showMore"));
              data[i].imgShowMore = "arrow_down.png";
            }
            else 
            {
                if (data[i].isRowClicked) {
                  data[i].description =  data[i].shortNews;
                  data[i].isRowClicked = false;
                  data[i].lblShowMore = CommonUtilities.changedataCase(kony.i18n.getLocalizedString("i18n.wealth.showMore"));
                  data[i].imgShowMore = "arrow_down.png";
                }
                else {
                  data[i].description =  data[i].detailedNews;
                  data[i].isRowClicked = true;
                  data[i].lblShowMore = CommonUtilities.changedataCase(kony.i18n.getLocalizedString("i18n.wealth.showLess"));
                  data[i].imgShowMore = "chevron_up.png";
                }
            }
            this.view.segNews.setDataAt(data[i], i);
          }
        },
	};
});