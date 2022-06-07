import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Filter } from 'components/Filter/Filter';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Container, Section, TitleH1, TitleH2 } from './App.styled';

const initialContacts = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
    const [contacts, setContacts] = useState(
        () => JSON.parse(localStorage.getItem('contacts')) ?? initialContacts);
    
    const [filter, setFilter] = useState('');
    
    // запись контакта в localStorage
    useEffect(() => {
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }, [contacts]);

    // добавляет контакт в список
    const addContact = ({ name, number }) => {
        const findName = contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
        );
        if (findName) {
        return alert(`${name} is already in contacts.`);
        }

        const findNumber = contacts.find(
        contact => contact.number === number);
        if (findNumber) {
        return alert(`This phone number is already in use.`);
        }

        const newContact = {
            id: nanoid(),
            name,
            number,
        };
        setContacts(contacts => [...contacts, newContact]);
    };

    // Удаляет контакт из списка
    const deleteContact = contactId => {
        setContacts(contact => contacts.filter(contact => contact.id !== contactId)
        );
    };

    const handleFilter = e => {
        setFilter(e.currentTarget.value);
    };

    // Возвращает результат фильтра
    const filterContacts = () => {
        const normalizedFilter = filter.toLowerCase();
        return contacts.filter(contact =>
            contact.name.toLowerCase().includes(normalizedFilter)
        );
    };

    const visibleContacts = filterContacts();

    return (
        <Container>
            <Section title="Phonebook">
                <TitleH1>Phonebook</TitleH1>
                <ContactForm onSubmit={addContact} />
            </Section>
            <Section title="Contacts">
                <TitleH2>Contacts</TitleH2>
                <Filter value={filter} onChange={handleFilter} />
                <ContactList
                    contacts={visibleContacts}
                    onDeleteContact={deleteContact}
                />
            </Section>
        </Container>
    );
}