import React, { useState, useEffect } from "react";import React, { useState } from "react";

import {import {

  View,  View,

  Text,  Text,

  FlatList,  StyleSheet,

  StyleSheet,  FlatList,

  ActivityIndicator,  TouchableOpacity,

  TouchableOpacity,} from "react-native";

} from "react-native";import NoteItem from "../components/NoteItem";

import { getNotes } from "../services/note-service";import NoteInput from "../components/NoteInput";

import NoteItem from "../components/NoteItem";

import AddNoteModal from "../components/AddNoteModal";// Sample initial notes data

const initialNotes = [

const NotesScreen = () => {  {

  const [notes, setNotes] = useState([]);    id: "1",

  const [loading, setLoading] = useState(true);    content: "Learn React Native",

  const [error, setError] = useState(null);    createdAt: new Date().toISOString(),

  const [modalVisible, setModalVisible] = useState(false);  },

  {

  useEffect(() => {    id: "2",

    fetchNotes();    content: "Complete the tutorial",

  }, []);    createdAt: new Date().toISOString(),

  },

  // Function to fetch notes from the database];

  const fetchNotes = async () => {

    try {export default function NotesScreen() {

      setLoading(true);  const [notes, setNotes] = useState(initialNotes);

      const fetchedNotes = await getNotes();  const [modalVisible, setModalVisible] = useState(false);

      setNotes(fetchedNotes);  const [noteText, setNoteText] = useState("");

    } catch (err) {  const [editingNote, setEditingNote] = useState(null);

      console.error("Error fetching notes:", err);

      setError("Failed to load notes. Please try again.");  // Function to add or update a note

    } finally {  const saveNote = () => {

      setLoading(false);    if (noteText.trim() === "") return;

    }

  };    if (editingNote) {

      // Update existing note

  // Add the new note to the state and avoid refetching      setNotes(

  const handleNoteAdded = (newNote) => {        notes.map((note) =>

    setNotes((currentNotes) => [newNote, ...currentNotes]);          note.id === editingNote.id

  };            ? {

                ...note,

  // Handle note deletion by removing it from state                content: noteText,

  const handleNoteDeleted = (noteId) => {                updatedAt: new Date().toISOString(),

    setNotes((currentNotes) =>              }

      currentNotes.filter((note) => note.$id !== noteId)            : note

    );        )

  };      );

      setEditingNote(null);

  // Handle note update by updating it in state    } else {

  const handleNoteUpdated = (updatedNote) => {      // Add new note

    setNotes((currentNotes) =>      const newNote = {

      currentNotes.map((note) =>        id: Date.now().toString(),

        note.$id === updatedNote.$id ? updatedNote : note        content: noteText,

      )        createdAt: new Date().toISOString(),

    );      };

  };      setNotes([newNote, ...notes]);

    }

  // Show loading indicator while fetching data

  if (loading && notes.length === 0) {    setNoteText("");

    return (    setModalVisible(false);

      <View style={styles.centered}>  };

        <ActivityIndicator size="large" color="#0000ff" />

      </View>  // Function to delete a note

    );  const deleteNote = (id) => {

  }    setNotes(notes.filter((note) => note.id !== id));

  };

  // Show error message if there was a problem

  if (error && notes.length === 0) {  // Function to open edit mode

    return (  const editNote = (note) => {

      <View style={styles.centered}>    setEditingNote(note);

        <Text style={styles.errorText}>{error}</Text>    setNoteText(note.content);

      </View>    setModalVisible(true);

    );  };

  }

  // Function to close the modal

  // Render the list of notes  const closeModal = () => {

  return (    setModalVisible(false);

    <View style={styles.container}>    setNoteText("");

      <View style={styles.header}>    setEditingNote(null);

        <Text style={styles.title}>My Notes</Text>  };

        <TouchableOpacity

          style={styles.addButton}  // Note item component

          onPress={() => setModalVisible(true)}  const renderNote = ({ item }) => (

        >    <NoteItem note={item} onEdit={editNote} onDelete={deleteNote} />

          <Text style={styles.addButtonText}>+ Add Note</Text>  );

        </TouchableOpacity>

      </View>  return (

    <View style={styles.container}>

      <FlatList      <View style={styles.header}>

        data={notes}        <Text style={styles.headerTitle}>My Notes</Text>

        keyExtractor={(item) => item.$id}        <TouchableOpacity

        renderItem={({ item }) => (          style={styles.addButton}

          <NoteItem          onPress={() => setModalVisible(true)}

            note={item}        >

            onNoteDeleted={handleNoteDeleted}          <Text style={styles.addButtonText}>+</Text>

            onNoteUpdated={handleNoteUpdated}        </TouchableOpacity>

          />      </View>

        )}

        contentContainerStyle={styles.listContent}      {notes.length > 0 ? (

        refreshing={loading}        <FlatList

        onRefresh={fetchNotes}          data={notes}

      />          renderItem={renderNote}

          keyExtractor={(item) => item.id}

      <AddNoteModal          contentContainerStyle={styles.notesList}

        visible={modalVisible}        />

        onClose={() => setModalVisible(false)}      ) : (

        onNoteAdded={handleNoteAdded}        <View style={styles.emptyContainer}>

      />          <Text style={styles.emptyText}>No notes yet. Create one!</Text>

    </View>        </View>

  );      )}

};

      <NoteInput

const styles = StyleSheet.create({        visible={modalVisible}

  container: {        onClose={closeModal}

    flex: 1,        onSave={saveNote}

    padding: 16,        noteText={noteText}

    backgroundColor: "#f5f5f5",        setNoteText={setNoteText}

  },        isEditing={!!editingNote}

  header: {      />

    flexDirection: "row",    </View>

    justifyContent: "space-between",  );

    alignItems: "center",}

    marginBottom: 16,

  },const styles = StyleSheet.create({

  title: {  container: {

    fontSize: 24,    flex: 1,

    fontWeight: "bold",    backgroundColor: "#f5f5f5",

    color: "#333",  },

  },  header: {

  addButton: {    height: 100,

    backgroundColor: "#2196F3",    backgroundColor: "#3498db",

    paddingVertical: 8,    flexDirection: "row",

    paddingHorizontal: 12,    justifyContent: "space-between",

    borderRadius: 5,    alignItems: "flex-end",

  },    paddingBottom: 15,

  addButtonText: {    paddingHorizontal: 20,

    color: "white",  },

    fontWeight: "bold",  headerTitle: {

  },    color: "white",

  listContent: {    fontSize: 24,

    paddingBottom: 20,    fontWeight: "bold",

  },  },

  centered: {  addButton: {

    flex: 1,    width: 36,

    justifyContent: "center",    height: 36,

    alignItems: "center",    borderRadius: 18,

  },    backgroundColor: "white",

  errorText: {    justifyContent: "center",

    color: "red",    alignItems: "center",

    fontSize: 16,  },

    textAlign: "center",  addButtonText: {

  },    fontSize: 24,

});    color: "#3498db",

    fontWeight: "bold",

export default NotesScreen;    marginTop: -2,

  },
  notesList: {
    padding: 15,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#7f8c8d",
  },
});