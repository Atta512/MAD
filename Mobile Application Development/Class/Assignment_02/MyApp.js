import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SectionList,
  Modal,
  TouchableOpacity,
  StatusBar,
  Platform
} from 'react-native';

const initialContacts = [
  { id: '1', name: 'usman', number: '123-4567', group: 'Family' },
  { id: '2', name: 'Ali', number: '234-5678', group: 'Family' },
  { id: '3', name: 'Jawad', number: '345-6789', group: 'Family' },
  { id: '4', name: 'Shayan', number: '456-7890', group: 'Family' },
  { id: '5', name: 'Usama', number: '567-8901', group: 'Friends' },
  { id: '6', name: 'Umer', number: '678-9012', group: 'Work' },
  { id: '7', name: 'Hamza', number: '789-0123', group: 'Friends' },
  { id: '8', name: 'Ejaz', number: '890-1234', group: 'Friends' },
  { id: '9', name: 'Bilal', number: '901-2345', group: 'Work' },
  { id: '10', name: 'Arfat', number: '012-3456', group: 'Work' },
];

type Contact = {
  id: string;
  name: string;
  number: string;
  group?: string;
};

export default function App() {
  const [searchText, setSearchText] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const groupedContacts = initialContacts.reduce((acc: Record<string, Contact[]>, contact) => {
    const group = contact.group || 'Other';
    if (!acc[group]) acc[group] = [];
    acc[group].push(contact);
    return acc;
  }, {});

  const sections = Object.keys(groupedContacts)
    .map(group => ({
      title: group,
      data: groupedContacts[group].filter(contact =>
        contact.name.toLowerCase().includes(searchText.toLowerCase()) ||
        contact.number.includes(searchText)
      )
    }))
    .filter(section => section.data.length > 0);

  const getGroupColor = (group: string) => {
    switch (group) {
      case 'Family': return '#FFCDD2';
      case 'Friends': return '#C8E6C9';
      case 'Work': return '#BBDEFB';
      default: return '#E0E0E0';
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#455A64" />

      <Text style={styles.title}>Contact Directory</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Type to search..."
        placeholderTextColor="#B0BEC5"
        value={searchText}
        onChangeText={setSearchText}
      />

      <SectionList
        sections={sections}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.contactItem}
            onPress={() => {
              setSelectedContact(item);
              setModalVisible(true);
            }}
          >
            <View style={styles.textContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.number}>{item.number}</Text>
            </View>
          </TouchableOpacity>
        )}
        renderSectionHeader={({ section }) => (
          <View style={[styles.sectionHeader, { backgroundColor: getGroupColor(section.title) }]}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />

      {/* Contact Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Contact Details</Text>
            {selectedContact && (
              <>
                <Text style={styles.detailText}>Name: {selectedContact.name}</Text>
                <Text style={styles.detailText}>Phone: {selectedContact.number}</Text>
                <Text style={styles.detailText}>Group: {selectedContact.group || 'Other'}</Text>
              </>
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Got It</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECEFF1',
    paddingTop: Platform.OS === 'android' ? 40 : 60,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
    backgroundColor: '#455A64',
    paddingVertical: 10,
    borderRadius: 8,
  },
  searchInput: {
    height: 50,
    backgroundColor: '#CFD8DC',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#263238',
    marginBottom: 15,
  },
  listContent: {
    paddingBottom: 100,
  },
  sectionHeader: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginVertical: 5,
  },
  sectionTitle: {
    fontWeight: '700',
    fontSize: 20,
    color: '#37474F',
  },
  contactItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: '#263238',
  },
  number: {
    color: '#546E7A',
    marginTop: 4,
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(69,90,100,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 16,
    width: '85%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 20,
    color: '#455A64',
  },
  detailText: {
    fontSize: 18,
    marginBottom: 12,
    color: '#37474F',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#455A64',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 18,
  },
});
