
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clock, CheckCircle2, Map, Zap, MessageSquare, ShieldCheck, X, Trash2, Calendar, Shield } from 'lucide-react';

interface NoteEntry {
  id: string;
  text: string;
  date: string;
}

interface PersonalSpaceProps {
  onBack: () => void;
  isFocusMode: boolean;
  setIsFocusMode: (val: boolean) => void;
}

const PersonalSpace: React.FC<PersonalSpaceProps> = ({ onBack, isFocusMode, setIsFocusMode }) => {
  // Timer State
  const [timer, setTimer] = useState<number | null>(null);
  const [timerActive, setTimerActive] = useState(false);

  // Checkbox State
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  // Roadmap State (LocalStorage)
  const [roadmap, setRoadmap] = useState({
    learn: '',
    struggle: '',
    nextStep: ''
  });

  // Notes/Journal State (LocalStorage)
  const [notesHistory, setNotesHistory] = useState<NoteEntry[]>([]);
  const [currentNote, setCurrentNote] = useState('');

  useEffect(() => {
    // Load roadmap
    const savedRoadmap = localStorage.getItem('akif_dev_roadmap');
    if (savedRoadmap) setRoadmap(JSON.parse(savedRoadmap));

    // Load notes history
    const savedNotes = localStorage.getItem('akif_dev_personal_notes');
    if (savedNotes) setNotesHistory(JSON.parse(savedNotes));
  }, []);

  const saveRoadmap = (key: string, value: string) => {
    const newRoadmap = { ...roadmap, [key]: value };
    setRoadmap(newRoadmap);
    localStorage.setItem('akif_dev_roadmap', JSON