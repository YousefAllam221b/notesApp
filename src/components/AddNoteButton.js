import React from 'react';

class AddNoteButton extends React.Component{

  noteTitle = React.createRef();

  handleAddNote = (e) => {
    e.preventDefault();
    this.props.addNote(this.noteTitle.current.value);
    e.currentTarget.reset();
  }

  render()
  {
    return (
          <form id='addNoteForm' onSubmit = {this.handleAddNote}>
            <input
              type = 'text'
              ref = {this.noteTitle}
              placeholder = "Enter a note's title"
              id = 'addNoteInput'
            />
            <input
               id = 'add-note'
              type = 'submit'
              value = 'Add Note'
            />
          </form>
    );
  }
}

export default AddNoteButton;
