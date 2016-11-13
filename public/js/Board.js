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
