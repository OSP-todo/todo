import {StyleSheet} from 'react-native';
import {theme} from './theme';

export const viewStyles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: theme.background,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
});

export const textStyles = StyleSheet.create({
    title: {
        fontSize: 35,
        fontWeight: '600',
        color: theme.main,
        alignItems: 'flex-start',
        marginVertical: 10,
        marginLeft: 0,
    },
});

export const barStyles = StyleSheet.create({
    statusbar: {
        backgroundColor: theme.background,
    },
});