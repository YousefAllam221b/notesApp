import React from 'react';

class NoteCard extends React.Component
{
  handleDeleteNote = (e) => {
      e.stopPropagation();
      e.preventDefault();
      this.props.deleteNote(this.props.noteInfo.id, this.props.noteInfo.id);
  }

  handleChange = (event) => {
    this.props.changeText(this.props.noteInfo.id, event.target.value)
  }

  handleTitleChange = (event) => {
    this.props.changeTitle(this.props.noteInfo.id, event.target.value)
  }

  render() {
    return (
      <div className = 'card-body note col-12'>
        <div id = 'note-title' className = 'd-flex align-items-center justify-content-between'>
          <textarea className ="note-title form-control" value={this.props.noteInfo.title.replaceAll('<br>\n','\n')} onChange={this.handleTitleChange} spellCheck="false"></textarea>
          <button onClick = {this.handleDeleteNote} id="close-button" type="button" className="btn-close text-reset me-3" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <textarea className ="note-content note form-control" value={this.props.noteInfo.value.replaceAll('<br>\n','\n')} onChange={this.handleChange} spellCheck="false"></textarea>
      </div>
    );
  }
}
export default NoteCard;
