import React from "react";
import Check from '../images/Check.svg';
import Xerror from '../images/Xerror.svg';

function InfoToolTip(props) {
	const { isOpen, toggle } = props

	return (
		<div 
			className={`toolTip ${isOpen && 'toolTip_visible'}`}
			onClick={e => e.target === e.currentTarget && toggle()}
			>
			<div className="modal__container">
				<div className="modal__content">
                <img className="modal__icon" src={props.valid ? Check : Xerror} alt={props.valid ? 'Check Mark' : 'Error'} />
        {props.valid ? <p className="modal__infotool-text">Success! You have now been registered.</p> : <p className="modal__infotool-text">Oops, something went wrong! Please try again</p>}
      </div>
					<button
						className="modal__close link"
						onClick={props.onClose}
					></button>
				</div>
			</div>
		
	);
}

export default InfoToolTip;
