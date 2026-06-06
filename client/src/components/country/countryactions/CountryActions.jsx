import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import "./CountryActions.css";

const API_BASE = "http://localhost:5000/api";

function CountryActions({ country }) {
  const { user, isAuthenticated, authFetch } = useAuth();

  // Derive country code from country data
  const countryCode = country?.atlas?.name || country?.name || "";

  // ── Save State ──
  const [isSaved, setIsSaved] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  // ── Comments State ──
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // ── Notes State ──
  const [note, setNote] = useState(null);
  const [noteText, setNoteText] = useState("");

  // ── Fetch initial data ──
  const fetchData = useCallback(async () => {
    if (!countryCode) return;

    // Fetch comments (public — no auth needed)
    try {
      const res = await fetch(
        `${API_BASE}/comments/${encodeURIComponent(countryCode)}`
      );
      const data = await res.json();
      if (data.success) setComments(data.data);
    } catch (err) {
      console.error("Comments fetch error:", err);
    }

    if (!isAuthenticated) return;

    // Check if saved
    try {
      const saveData = await authFetch(
        `${API_BASE}/saved-countries/check/${encodeURIComponent(countryCode)}`
      );
      if (saveData.success) setIsSaved(saveData.saved);
    } catch (err) {
      console.error("Save check error:", err);
    }

    // Fetch personal note
    try {
      const noteData = await authFetch(
        `${API_BASE}/notes/${encodeURIComponent(countryCode)}`
      );
      if (noteData.success && noteData.data) {
        setNote(noteData.data);
        setNoteText(noteData.data.note);
      }
    } catch (err) {
      console.error("Note fetch error:", err);
    }
  }, [countryCode, isAuthenticated, authFetch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ── Save / Unsave ──
  const handleToggleSave = async () => {
    if (!isAuthenticated) return;
    setSaveLoading(true);

    try {
      if (isSaved) {
        await authFetch(
          `${API_BASE}/saved-countries/${encodeURIComponent(countryCode)}`,
          { method: "DELETE" }
        );
        setIsSaved(false);
      } else {
        await authFetch(`${API_BASE}/saved-countries`, {
          method: "POST",
          body: JSON.stringify({ countryCode }),
        });
        setIsSaved(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaveLoading(false);
    }
  };

  // ── Comments ──
  const handleAddComment = async () => {
    if (!newComment.trim() || !isAuthenticated) return;

    try {
      const data = await authFetch(`${API_BASE}/comments`, {
        method: "POST",
        body: JSON.stringify({
          countryCode,
          text: newComment.trim(),
        }),
      });
      if (data.success) {
        setComments((prev) => [data.data, ...prev]);
        setNewComment("");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditComment = async (id) => {
    if (!editText.trim()) return;

    try {
      const data = await authFetch(`${API_BASE}/comments/${id}`, {
        method: "PUT",
        body: JSON.stringify({ text: editText.trim() }),
      });
      if (data.success) {
        setComments((prev) =>
          prev.map((c) => (c._id === id ? data.data : c))
        );
      }
      setEditingId(null);
      setEditText("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteComment = async (id) => {
    try {
      await authFetch(`${API_BASE}/comments/${id}`, {
        method: "DELETE",
      });
      setComments((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // ── Notes ──
  const handleSaveNote = async () => {
    if (!noteText.trim() || !isAuthenticated) return;

    try {
      const data = await authFetch(`${API_BASE}/notes`, {
        method: "PUT",
        body: JSON.stringify({
          countryCode,
          note: noteText.trim(),
        }),
      });
      if (data.success) {
        setNote(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (!countryCode) return null;

  return (
    <div className="countryActions">
      <div className="countryActionsInner">

        {/* ── Save Country ── */}
        <div className="saveCountryRow">
          {isAuthenticated ? (
            <button
              id="save-country-btn"
              className={`saveBtn ${isSaved ? "saved" : ""}`}
              onClick={handleToggleSave}
              disabled={saveLoading}
            >
              <span className="saveIcon">
                {isSaved ? "★" : "☆"}
              </span>
              {isSaved ? "Saved" : "Save Country"}
            </button>
          ) : (
            <div className="loginPrompt">
              <Link to="/login">Sign in</Link> to save countries, add comments and notes.
            </div>
          )}
        </div>

        {/* ── Comments ── */}
        <div className="commentsSection">

          <div className="actionsSubtitle">PUBLIC</div>
          <div className="actionsTitle">Comments</div>

          {isAuthenticated && (
            <div className="commentForm">
              <textarea
                id="new-comment-input"
                placeholder="Share your thoughts about this country..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button
                id="post-comment-btn"
                onClick={handleAddComment}
              >
                Post
              </button>
            </div>
          )}

          <div className="commentsList">
            {comments.length === 0 && (
              <div style={{
                color: "rgba(255,255,255,0.35)",
                fontSize: "14px",
                fontFamily: "var(--font-family)",
                padding: "20px 0"
              }}>
                No comments yet. Be the first to share your thoughts.
              </div>
            )}

            {comments.map((c) => (
              <div key={c._id} className="commentCard">
                <div className="commentHeader">
                  <span className="commentAuthor">
                    {c.userId?.username || "User"}
                  </span>
                  <span className="commentDate">
                    {formatDate(c.createdAt)}
                  </span>
                </div>

                {editingId === c._id ? (
                  <div className="commentEditArea">
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                    <div className="commentEditActions">
                      <button
                        className="commentActionBtn"
                        onClick={() => handleEditComment(c._id)}
                      >
                        Save
                      </button>
                      <button
                        className="commentActionBtn"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="commentBody">{c.text}</div>

                    {isAuthenticated &&
                      user?.id === (c.userId?._id || c.userId) && (
                      <div className="commentActions">
                        <button
                          className="commentActionBtn"
                          onClick={() => {
                            setEditingId(c._id);
                            setEditText(c.text);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="commentActionBtn danger"
                          onClick={() => handleDeleteComment(c._id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>

        </div>

        <div className="actionsDivider" />

        {/* ── Personal Notes ── */}
        {isAuthenticated && (
          <div className="notesSection">

            <div className="actionsSubtitle">PRIVATE</div>
            <div className="actionsTitle">Personal Notes</div>

            <div className="noteForm">
              <textarea
                id="note-input"
                placeholder="Write your private notes about this country..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
              />
              <button
                id="save-note-btn"
                onClick={handleSaveNote}
              >
                {note ? "Update Note" : "Save Note"}
              </button>
            </div>

            {note && (
              <div className="noteDisplay">
                <div className="noteLabel">
                  Last updated: {formatDate(note.updatedAt)}
                </div>
                <div className="noteText">{note.note}</div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}

export default CountryActions;
