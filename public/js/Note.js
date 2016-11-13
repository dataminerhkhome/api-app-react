var Note = React.createClass({
    getInitialState: function() {
        return {editing: false}
    },
    // componentWillMount: function() {
    //     this.style = {
    //         right: this.randomBetween(0, window.innerWidth - 150) + 'px',
    //         top: this.randomBetween(0, window.innerHeight - 150) + 'px',
    //         // transform: 'rotate(' + this.randomBetween(-15, 15) + 'deg)'
    //     };
    // },
    //

    handleTemplateDrop: function(e,ui){
        var target_widget = $(e.target);


            //get values from drag element
            var template = ui.draggable.attr("data-template");



            target_widget.attr("data-endpoint", end_point);
            target_widget.data("widget", {
              metric_group_by : g_by,
              dimension1 : dim,
              dimension2 : dim2,
              kpi_template : template
            });

            target_widget.removeClass("empty");
            target_widget.addClass("has-template");
            target_widget.droppable("option", "accept", ".template");
            target_widget.droppable("option", "drop", handleTemplateDrop);

            // $(e.target).find("select.widget-charttype").attr("disabled", false);
            // $(e.target).find("select.widget-export").attr("disabled", false);

            // var widget_container_id = "#" + target_widget.attr("id");
            // var chart_label = ui.draggable.attr('chart-label');
            //check whether end_point existed
            if (_dataFilter.hasEndPoint(end_point)) {

              if (! target_widget.data('inwidget')) {
                var aggtype_block = target_widget.find("ul.aggtype-block");
                if (aggtype_block.length > 0 && g_by)
                  aggtype_block.hide();
                target_widget.data('inwidget', new KPIdash.Widget(self, e.target, {
                  dimension : dim,
                  group_by : g_by,
                  dimension2 : dim2,
                  end_point : end_point,
                  dimension_label : getRelatedLabel("dimension", dim),
                  metric_label : getRelatedLabel("metric", g_by),
                  dimension2_label : getRelatedLabel("dimension", dim2)
                }, {

                  template : template
                }));
              }

            } else {
              _dataFilter.loadEndPointData("init", _range, end_point);
            }
    },
    componentDidMount: function(){
        var self=this;
        $(this.getDOMNode()).filter(".empty").droppable({
          accept : ".template",
          activeClass : "ui-state-hover",
          hoverClass : "ui-state-active",
          drop : self.handleTemplateDrop
        });
    },
    randomBetween: function(min, max) {
        return (min + Math.ceil(Math.random() * max));
    },
    edit: function() {
        this.setState({editing: true});
    },
    save: function() {
        this.props.onChange(this.refs.newText.getDOMNode().value, this.props.index);
        this.setState({editing: false});
    },
    remove: function() {
        this.props.onRemove(this.props.index);
    },
    renderDisplay: function() {
        return (
            <div className="note empty"
                data-ss-colspan={this.props.cols} data-ss-rowspan={this.props.rows}>
                <div className="widget-content">&nbsp;</div>
                <span>
                    <button onClick={this.edit}
                            className="btn btn-primary glyphicon glyphicon-pencil"/>
                    <button onClick={this.remove}
                            className="btn btn-danger glyphicon glyphicon-trash"/>
                </span>
            </div>
            );
    },
    renderForm: function() {
        return (
            <div className="note" style={this.style}>
            <textarea ref="newText" defaultValue={this.props.children}
            className="form-control"></textarea>
            <button onClick={this.save} className="btn btn-success btn-sm glyphicon glyphicon-floppy-disk" />
            </div>
            )
    },
    render: function() {
        if (this.state.editing) {
            return this.renderForm();
        }
        else {
            return this.renderDisplay();
        }
    }
});

var Board = React.createClass({
    propTypes: {
        count: function(props, propName) {
            if (typeof props[propName] !== "number"){
                return new Error('The count property must be a number');
            }
            if (props[propName] > 100) {
                return new Error("Creating " + props[propName] + " notes is ridiculous");
            }
        }
    },
    getInitialState: function() {
        return {
            notes: []
        };
    },
    nextId: function() {
        this.uniqueId = this.uniqueId || 0;
        return this.uniqueId++;
    },
    componentWillMount: function() {
        var self = this;
        // if(this.props.count) {
        //     $.getJSON("http://baconipsum.com/api/?type=all-meat&sentences=" +
        //         this.props.count + "&start-with-lorem=1&callback=?", function(results){
        //             results[0].split('. ').forEach(function(sentence){
        //                 self.add(sentence.substring(0,40));
        //             });
        //         });


        // }
        var inits=[2,1,1]
        inits.forEach(function(size){
            self.add(size);
        });
    },

    componentDidMount: function(){
        var shapeShiftDefaults = {
          enableDrag : true,
          enalbeResize : true,
          align : "left",
          gutterX : 5,
          gutterY : 5,
          widgetX : 280,
          widgetY : 280

        };
        $(this.getDOMNode()).find(".board").shapeshift(shapeShiftDefaults);
    },
    add: function(size) {
        var arr = this.state.notes;
        arr.push({
            id: this.nextId(),
            note: size+" size",
            cols: size,
            rows: size
        });
        this.setState({notes: arr});
    },
    update: function(newText, i) {
        var arr = this.state.notes;
        arr[i].note = newText;
        this.setState({notes:arr});
    },
    remove: function(i) {
        var arr = this.state.notes;
        arr.splice(i, 1);
        this.setState({notes: arr});
    },
    eachNote: function(note, i) {
        return (
                <Note key={note.id}
                    index={i}
                    cols={note.cols}
                    rows={note.rows}
                    onChange={this.update}
                    onRemove={this.remove}
                />
            );
    },
    render: function() {
        return (
        <section>
        <button className="btn btn-sm btn-success glyphicon glyphicon-plus"
                            onClick={this.add.bind(null, "New Note")}/>
           <div className="board">
                    {this.state.notes.map(this.eachNote)}

            </div>
        </section>
        );
    }
});


React.render(<Board count={50}/>,
    document.getElementById('react-container'));

    $(".draggable.template").draggable({
      scroll : true,
      revert : true,
      cursor : "crosshair",
      cursorAt : {
        bottom : 10
      },
      helper : "clone",
      opacity : 0.7,
      zIndex: 1000



    });










