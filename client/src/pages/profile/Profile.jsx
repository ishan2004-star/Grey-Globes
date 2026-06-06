import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/ui/navbar/Navbar";
import "./profile.css";

const API_BASE = "http://localhost:5000/api";

const TABS = [
  { key: "account", label: "Account" },
  { key: "saved", label: "Saved Countries" },
  { key: "comparisons", label: "Comparisons" },
  { key: "comments", label: "My Comments" },
  { key: "notes", label: "Personal Notes" },
];

function Profile() {
  const { user, logout, isAuthenticated, loading, authFetch } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("account");

  // Data states
  const [savedCountries, setSavedCountries] = useState([]);
  const [comparisons, setComparisons] = useState([]);
  const [comments, setComments] = useState([]);
  const [notes, setNotes] = useState([]);

  // Loading states
  const [dataLoading, setDataLoading] = useState(false);

  // Edit states
  const [editingComment, setEditingComment] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");
  const [editingNote, setEditingNote] = useState(null);
  const [editNoteText, setEditNoteText] = useState("");

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login");
    }
  }, [loading, isAuthenticated, navigate]);

  // Fetch data when tab changes
  const fetchTabData = useCallback(async () => {
    if (!isAuthenticated) return;

    setDataLoading(true);
    try {
      if (activeTab === "saved") {
        const data = await authFetch(`${API_BASE}/saved-countries`);
        if (data.success) setSavedCountries(data.data);
      } else if (activeTab === "comparisons") {
        const data = await authFetch(`${API_BASE}/comparisons`);
        if (data.success) setComparisons(data.data);
      } else if (activeTab === "comments") {
        const data = await authFetch(`${API_BASE}/comments/user/me`);
        if (data.success) setComments(data.data);
      } else if (activeTab === "notes") {
        const data = await authFetch(`${API_BASE}/notes`);
        if (data.success) setNotes(data.data);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setDataLoading(false);
    }
  }, [activeTab, isAuthenticated, authFetch]);

  useEffect(() => {
    fetchTabData();
  }, [fetchTabData]);

  // Actions
  const handleUnsave = async (countryCode) => {
    try {
      await authFetch(`${API_BASE}/saved-countries/${countryCode}`, {
        method: "DELETE",
      });
      setSavedCountries((prev) =>
        prev.filter((c) => c.countryCode !== countryCode)
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteComparison = async (id) => {
    try {
      await authFetch(`${API_BASE}/comparisons/${id}`, {
        method: "DELETE",
      });
      setComparisons((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditComment = (comment) => {
    setEditingComment(comment._id);
    setEditCommentText(comment.text);
  };

  const handleSaveComment = async (id) => {
    try {
      const data = await authFetch(`${API_BASE}/comments/${id}`, {
        method: "PUT",
        body: JSON.stringify({ text: editCommentText }),
      });
      if (data.success) {
        setComments((prev) =>
          prev.map((c) => (c._id === id ? data.data : c))
        );
      }
      setEditingComment(null);
      setEditCommentText("");
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

  const handleEditNote = (note) => {
    setEditingNote(note._id);
    setEditNoteText(note.note);
  };

  const handleSaveNote = async (noteItem) => {
    try {
      const data = await authFetch(`${API_BASE}/notes`, {
        method: "PUT",
        body: JSON.stringify({
          countryCode: noteItem.countryCode,
          note: editNoteText,
        }),
      });
      if (data.success) {
        setNotes((prev) =>
          prev.map((n) => (n._id === noteItem._id ? data.data : n))
        );
      }
      setEditingNote(null);
      setEditNoteText("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await authFetch(`${API_BASE}/notes/${id}`, {
        method: "DELETE",
      });
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) return null;
  if (!user) return null;

  return (
    <div className="profilePage">

      <Navbar />

      <div className="profileContent">

        {/* Header */}
        <div className="profileHeader">
          <h1>{user.username}</h1>
          <div className="profileMeta">
            <span>{user.email}</span>
            <span>Joined {formatDate(user.createdAt)}</span>
            <button
              id="profile-logout"
              className="profileLogout"
              onClick={handleLogout}
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="profileTabs">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              id={`tab-${tab.key}`}
              className={`profileTab ${activeTab === tab.key ? "active" : ""}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="profilePanel" key={activeTab}>

          {dataLoading && (
            <div className="profileEmpty">Loading...</div>
          )}

          {/* ── ACCOUNT ── */}
          {activeTab === "account" && !dataLoading && (
            <div className="accountInfo">
              <div className="accountField">
                <label>Username</label>
                <p>{user.username}</p>
              </div>
              <div className="accountField">
                <label>Email</label>
                <p>{user.email}</p>
              </div>
              <div className="accountField">
                <label>Member Since</label>
                <p>{formatDate(user.createdAt)}</p>
              </div>
            </div>
          )}

          {/* ── SAVED COUNTRIES ── */}
          {activeTab === "saved" && !dataLoading && (
            <>
              {savedCountries.length === 0 ? (
                <div className="profileEmpty">
                  <div className="emptyIcon">🌍</div>
                  No saved countries yet. Explore countries and bookmark your favorites.
                </div>
              ) : (
                <div className="profileItemGrid">
                  {savedCountries.map((item) => (
                    <div key={item._id} className="profileItem">
                      <div className="profileItemTitle">
                        {item.countryCode}
                      </div>
                      <div className="profileItemMeta">
                        Saved {formatDate(item.savedAt)}
                      </div>
                      <div className="profileItemActions">
                        <button
                          className="profileItemBtn danger"
                          onClick={() => handleUnsave(item.countryCode)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* ── COMPARISONS ── */}
          {activeTab === "comparisons" && !dataLoading && (
            <>
              {comparisons.length === 0 ? (
                <div className="profileEmpty">
                  <div className="emptyIcon">⚖️</div>
                  No saved comparisons. Compare countries and save them for later.
                </div>
              ) : (
                <div className="profileItemGrid">
                  {comparisons.map((item) => (
                    <div key={item._id} className="profileItem">
                      <div className="profileItemTitle">
                        {item.title || "Comparison"}
                      </div>
                      <div className="profileItemMeta">
                        {formatDate(item.createdAt)}
                      </div>
                      <div className="comparisonTags">
                        {item.countries.map((c) => (
                          <span key={c} className="comparisonTag">
                            {c}
                          </span>
                        ))}
                      </div>
                      <div className="profileItemActions">
                        <button
                          className="profileItemBtn danger"
                          onClick={() => handleDeleteComparison(item._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* ── MY COMMENTS ── */}
          {activeTab === "comments" && !dataLoading && (
            <>
              {comments.length === 0 ? (
                <div className="profileEmpty">
                  <div className="emptyIcon">💬</div>
                  No comments yet. Visit country pages to share your thoughts.
                </div>
              ) : (
                <div className="profileItemGrid">
                  {comments.map((item) => (
                    <div key={item._id} className="profileItem">
                      <div className="profileItemTitle">
                        {item.countryCode}
                      </div>
                      <div className="profileItemMeta">
                        {formatDate(item.createdAt)}
                      </div>

                      {editingComment === item._id ? (
                        <div className="editArea">
                          <textarea
                            value={editCommentText}
                            onChange={(e) => setEditCommentText(e.target.value)}
                          />
                          <div className="editActions">
                            <button
                              className="profileItemBtn"
                              onClick={() => handleSaveComment(item._id)}
                            >
                              Save
                            </button>
                            <button
                              className="profileItemBtn"
                              onClick={() => setEditingComment(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="profileItemText">{item.text}</div>
                          <div className="profileItemActions">
                            <button
                              className="profileItemBtn"
                              onClick={() => handleEditComment(item)}
                            >
                              Edit
                            </button>
                            <button
                              className="profileItemBtn danger"
                              onClick={() => handleDeleteComment(item._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* ── PERSONAL NOTES ── */}
          {activeTab === "notes" && !dataLoading && (
            <>
              {notes.length === 0 ? (
                <div className="profileEmpty">
                  <div className="emptyIcon">📝</div>
                  No personal notes yet. Add private notes to any country page.
                </div>
              ) : (
                <div className="profileItemGrid">
                  {notes.map((item) => (
                    <div key={item._id} className="profileItem">
                      <div className="profileItemTitle">
                        {item.countryCode}
                      </div>
                      <div className="profileItemMeta">
                        Updated {formatDate(item.updatedAt)}
                      </div>

                      {editingNote === item._id ? (
                        <div className="editArea">
                          <textarea
                            value={editNoteText}
                            onChange={(e) => setEditNoteText(e.target.value)}
                          />
                          <div className="editActions">
                            <button
                              className="profileItemBtn"
                              onClick={() => handleSaveNote(item)}
                            >
                              Save
                            </button>
                            <button
                              className="profileItemBtn"
                              onClick={() => setEditingNote(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="profileItemText">{item.note}</div>
                          <div className="profileItemActions">
                            <button
                              className="profileItemBtn"
                              onClick={() => handleEditNote(item)}
                            >
                              Edit
                            </button>
                            <button
                              className="profileItemBtn danger"
                              onClick={() => handleDeleteNote(item._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

        </div>

      </div>

    </div>
  );
}

export default Profile;
