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

  React.render(<MyChart />,
    this.getDOMNode());


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

window.Note=Note;








