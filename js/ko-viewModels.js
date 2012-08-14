function Script(data) {
    this.name = ko.observable(data.name);
    this.link = ko.observable(data.link);
    this.action = ko.observable(data.action);
    this.isEnable = ko.observable(data.isEnable);
    this.isEdited = ko.observable(data.isEdited);
    this.fileItems = ko.observableArray(data.items);
}

function File(data) {
    this.name = data.name;
    this.link = data.link;
}
function ScriptListViewModel(data) {

    var self = this;
    //Scripts logic
	
    // Data
    self.scripts = ko.observableArray([]);

    self.script = { nameText: "", linkText: "", actionText: "" };

    self.script.nameText = ko.observable();
    self.script.linkText = ko.observable();
    self.script.actionText = ko.observable();

    // Operations
    self.script.add = function () {
        if (self.script.nameText() == "" ||
            self.script.linkText() == "" ||
            self.script.actionText() == "") return;

        var a = this.files.selectedItems();
        if (a.length == 0) {
            a.push(this.files.selectedItem());
        }

        self.scripts.push(new Script({ name: this.script.nameText(), link: this.script.linkText(), action: this.script.actionText(), items: a, isEnable: true}));
        self.script.nameText("");
        self.script.linkText("");
        self.script.actionText("");
        self.files.selectedItem("");
        self.files.selectedItems([]);
    };

    self.script.edit = function (script) { script.isEdited(!script.isEdited()); };
    self.script.remove = function (script) { self.scripts.remove(script) };

    //Files logic

    // Data
    self.files = ko.observableArray([]);
    self.files.selectedItems = ko.observableArray([]);
    self.files.selectedItem = ko.observable();


    self.file = { nameText: "", linkText: "" };

    self.file.nameText = ko.observable();
    self.file.linkText = ko.observable();

    // Operations
    self.file.add = function () {
        if (self.file.nameText() == "" ||
            self.file.linkText() == "") return;

        self.files.push(new File({ name: this.file.nameText(), link: this.file.linkText() }));
        self.file.nameText("");
        self.file.linkText("");
    };

    self.file.remove = function () {
        var removed = self.files.selectedItems();
        if (removed.length > 0) {
            for (var i = 0; i < removed.length; i++) {
                self.files.remove(removed[i]);
            }
        }
        else {
            self.files.remove(self.files.selectedItem());
        }
    };
	//Other
	self.out={compileJSON:"",JSON:ko.observable("")};
	self.out.JSON.subscribe(function(newValue) {
    		setTimeout(function(){prettyPrint();}, 50)
	});
    self.out.getJSONForExport = function () {
		
		   var scripts = [];
   $.each(self.scripts(),function(i,val) {
   	    if(val.isEnable())
   		{
          scripts .push(val); 
        }
   });
   		var a={files:self.files(),scripts:scripts };
		self.out.JSON(ko.toJSON(a));
	};
	
	self.to={updateObjects:"",JSON:ko.observable(),isOverrided:ko.observable(false)};
	self.to.updateObjects = function () {

	    if (this.to.JSON() == "") return;

	    if (this.to.isOverrided()) {
	        this.files.removeAll();
	        this.scripts.removeAll();
	    }

	    LoadData(this, this.to.JSON());
	    this.to.JSON("");
	};

	function LoadData(self,data){
	if(data){
			var a=JSON.parse(data);

		for(var i in a.files){
			self.files.push(new File({ name: a.files[i].name, link: a.files[i].link }));
		}
		for(var i in a.scripts){
			var files=[];
			for(var j in a.scripts[i].fileItems){
				var file=new File({ name: a.scripts[i].fileItems[j].name, link: a.scripts[i].fileItems[j].link });
				files.push(file);
			}
		
			self.scripts.push(new Script({ name: a.scripts[i].name, link: a.scripts[i].link, action: a.scripts[i].action, items: files, isEnable:a.scripts[i].isEnable }));
		}
	}
	};
	LoadData(self,data.get());
	self.save=function(){
   		var a={files:self.files(),self.scripts() };
		self.out.JSON(ko.toJSON(a));
		data.update(self.out.JSON());
	};
}

