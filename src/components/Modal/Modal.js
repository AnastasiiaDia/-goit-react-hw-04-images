import { Component } from 'react';
import { Overlay } from './Modal.styled';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.PressEscape);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.PressEscape);
  }
  PressEscape = e => {
    if (e.code === 'Escape') {
      this.props.onCloseModal();
    }
  };
  CloseModal = e => {
    if (e.currentTarget === e.target) {
      this.props.onCloseModal();
    }
  };
  render() {
    return (
      <Overlay onClick={this.CloseModal}>
        <div className="modal">{this.props.children}</div>
      </Overlay>
    );
  }
}
