'use client'
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Plus, Trash } from "lucide-react";

export default function Page() {
  // State to store notes
  const [notes, setNotes] = useState<string[]>([]);
  const [newNote, setNewNote] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Function to add a new note
  const addNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, newNote]);
      setNewNote("");
      setIsModalOpen(false);
    }
  };

  // Function to delete a note by index
  const deleteNote = (index: number) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Note Taking App</h1>

      {/* Button to open modal to add a new note */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2"
      >
        <Plus size={18} />
        Add Note
      </button>

      {/* List of notes */}
      <div className="mt-6">
        {notes.length === 0 ? (
          <p className="text-gray-600">No notes yet.</p>
        ) : (
          notes.map((note, index) => (
            <div
              key={index}
              className="bg-gray-100 p-4 mb-2 rounded flex justify-between items-center"
            >
              <p>{note}</p>
              <button
                onClick={() => deleteNote(index)}
                className="text-red-500"
              >
                <Trash size={18} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Modal for adding a new note */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <Dialog.Title className="text-lg font-bold">Add New Note</Dialog.Title>

            <input
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="w-full mt-4 p-2 border border-gray-300 rounded"
              placeholder="Write your note here..."
            />

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={addNote}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
