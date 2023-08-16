import {
    StyleSheet,
    SafeAreaView,
    FlatList, Text, View, useColorScheme, Pressable,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Card from "@/components/Cards";
import {IconButton} from "@react-native-material/core";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {Entypo} from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import {Link} from "expo-router";

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'Solde: 10',
        remainingDays: '5 jours restants du solde',
        dateS: '02/05/2023',
        dateE: '01/06/2023'
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Solde: 18',
        remainingDays: '10 jours restants du solde',
        dateS: '01/04/2023',
        dateE: '02/05/2023'
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Solde: 8',
        remainingDays: '2 jours restants du solde',
        dateS: '01/03/2023',
        dateE: '02/04/2023'
    },
    {
        id: 'bd7acbea-c605-aed5-a4f8-145571e29d72',
        title: 'Solde: 22',
        remainingDays: '10 jours restants du solde',
        dateS: '01/02/2023',
        dateE: '27/03/2023'
    },
    {
        id: '58694a0f-c605-c1b1-3da1-fbd91aa97f63',
        title: 'Solde: 1',
        remainingDays: '3 jours restants du solde',
        dateS: '02/01/2023',
        dateE: '02/02/2023'
    },
];


export default function IndexScreen() {
    let colorScheme = useColorScheme();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerButtons}>
                <Link href="/(tabs)/collaborateurs/newSolde" asChild>
                    <Pressable>
                        {() => {
                            return <Text style={styles.text}>Ajouter</Text>
                        }}
                    </Pressable>
                </Link>
            </View>
                <FlatList
                    style={styles.container}
                    contentContainerStyle={styles.cards}
                    showsVerticalScrollIndicator={false}
                    data={DATA}
                    renderItem={({item}) => <Card
                        title={`${item.dateE} - ${item.dateS}`}
                        date={undefined}
                        days={item.title}
                        status={item.remainingDays}
                        component={
                            <>
                                <Link href="/(tabs)/collaborateurs/EditSolde" asChild>
                                    <IconButton icon={<Entypo name="edit" color={Colors[colorScheme ?? 'light'].text} size={moderateScale(20)}/>}/>
                                </Link>
                                <IconButton icon={<FontAwesome name="trash" color={Colors[colorScheme ?? "light"].error} size={moderateScale(20)}/>}/>
                            </>}/>}
                    keyExtractor={item => item.id}
                />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cards:{
        alignItems:"center"
    },
    headerButtons: {
        flexDirection: "row",
        justifyContent: 'flex-end',
    },
    text: {
        fontSize: moderateScale(16),
        color: "#00bcd4",
        margin: 10,
    },
    separator: {
        marginVertical: moderateScale(30),
        height: 1,
        width: '80%',
    },
});