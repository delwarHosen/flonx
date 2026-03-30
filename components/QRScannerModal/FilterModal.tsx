
import { Colors } from '@/constants/theme';
import { hp, wp } from '@/utils/responsive';
import React from 'react';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Body1 } from '../typo/Typography';


const FILTER_OPTIONS = ['Last 24 Hours', 'Last 3 Days', 'Last Week', 'Last Month'];

interface FilterModalProps {
    visible: boolean;
    onClose: () => void;
    onSelect: (option: string) => void;
    selected?: string;
}

const FilterModal: React.FC<FilterModalProps> = ({ visible, onClose, onSelect, selected }) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose}>
                <View style={styles.modal}>
                    {FILTER_OPTIONS.map((option, index) => (
                        <TouchableOpacity
                            key={option}
                            style={[
                                styles.option,
                                index !== FILTER_OPTIONS.length - 1 && styles.borderBottom
                            ]}
                            onPress={() => {
                                onSelect(option);
                                onClose();
                            }}
                        >
                            <Body1 color={Colors.NEUTRAL0}>{option}</Body1>
                            <View style={[
                                styles.radio,
                                selected === option && styles.radioSelected
                            ]} />
                        </TouchableOpacity>
                    ))}
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

export default FilterModal;

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-start',  
        alignItems: 'center',
        paddingTop: hp(100),  
    },
    modal: {
        width: wp(300),
        backgroundColor: '#1A1535',
        borderRadius: 16,
        overflow: 'hidden',
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: wp(20),
        paddingVertical: hp(18),
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.BORDER_COLOR,
    },
    radio: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: Colors.PLACEHOLLDER_TEXT,
    },
    radioSelected: {
        borderColor: Colors.BRAND_PRIMARY,
        backgroundColor: Colors.BRAND_PRIMARY,
    },
});