export default function ErrorModal({ message, onClose }) {
    if (!message) return null;

    return (
        <div className="modal-backdrop error-modal">
            <div className="error-box">

                <h3 className="modal-title">Error</h3>

                <p className="modal-message">{message}</p>

                <div className="modal-actions">
                    <button className="close-btn" onClick={onClose}>Close</button>
                </div>

            </div>
        </div>
    );
}
