import { Colors } from '@/constants/theme';
import { Check } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Body3 } from '../typo/Typography';


interface CheckboxProps {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    required?: true;
    error?: string
}


export const Checkbox: React.FC<CheckboxProps> = ({
    label,
    checked,
    onChange,
    required = false,
    error
}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => onChange(!checked)}
                activeOpacity={0.7}
            >
                <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
                    {checked && <Check size={16} color={Colors.NEUTRAL0} />}
                </View>
                <Body3 color={Colors.PLACEHOLLDER_TEXT} style={styles.label}>
                    {label}
                    {/* {required && <Text style={styles.required}>*</Text>} */}
                </Body3>
            </TouchableOpacity>
            {error && (
                <Body3 color="#Ef4444" style={styles.error}>{error}</Body3>
            )}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        marginBottom: -16,
        marginTop:16
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: Colors.BORDER_COLOR,
        backgroundColor: Colors.INPUT_BACKGROUND,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    checkboxChecked: {
        backgroundColor: Colors.BRAND_PRIMARY,
        // borderColor: '#3872F0',
    },
    label: {
        flex: 1,
        color: Colors.PLACEHOLLDER_TEXT,
    },
    required: {
        color: '#EF4444',
        marginLeft: 4,
    },
    error: {
        marginTop: 4,
    },
});