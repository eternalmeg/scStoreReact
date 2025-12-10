export default function ConfirmModal({ show, message, onConfirm, onCancel }) {
    if (!show) return null;

    return (
        <div className="modal-backdrop confirm-modal">
            <div className="confirm-box">

                <h3 className="confirm-title">Confirm Action</h3>

                <p className="confirm-message">
                    {message}
                </p>

                <div className="confirm-actions">
                    <button className="btn-confirm" onClick={onConfirm}>OK</button>
                    <button className="btn-cancel" onClick={onCancel}>Cancel</button>
                </div>

            </div>
        </div>
    );
}
