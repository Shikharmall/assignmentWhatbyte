
import React from 'react'
import { View, Text, StyleSheet } from 'react-native';

type Priority = 'Low' | 'Medium' | 'High';

interface TaskProps {
    text: string;
    time: string;
    priority: Priority;
}

const getPriorityColor = (priority: Priority): string => {
    switch (priority) {
        case 'High':
            return 'red';
        case 'Medium':
            return 'orange';
        case 'Low':
            return 'green';
        default:
            return 'gray';
    }
};
export default function Tasks({ text, time, priority }: TaskProps) {
    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <View style={styles.circular}></View>
                <View>
                    {
                        text.length > 25 ?
                            <Text style={styles.itemText}>{text.substring(0, 24)}...</Text>
                            :
                            <Text style={styles.itemText}>{text}</Text>
                    }
                    <Text style={styles.itemTime}>{time}</Text>
                </View>
            </View>

            <View style={[styles.tag, { backgroundColor: getPriorityColor(priority) }]}>
                <Text style={{ color: 'white' }}>{priority}</Text>
            </View>

        </View>
    )
}


const styles = StyleSheet.create({
    item: {
        backgroundColor: '#f2f1f1ff',
        padding: 12,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    tags: {
        marginHorizontal: 2,
        flexDirection: 'row'
    },
    tag: {
        //backgroundColor: '#55BCF6',
        //opacity: 0.4,
        borderRadius: 50,
        marginRight: 15,
        padding: 5,
        paddingHorizontal: 10
    },
    itemText: {
        maxWidth: '100%',
        color: '#5e5e5eff',
        fontWeight: '600'
    },
    itemTime: {
        maxWidth: '100%',
        color: '#616161ff'
    },
    circular: {
        width: 20,
        height: 20,
        borderWidth: 3,
        borderRadius: 50,
        marginRight: 15,
        borderColor: '#55BCF6',
    },
});

