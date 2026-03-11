// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import { Dimensions, Platform, StyleSheet, View } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// import SectionTitle from '@/components/SectionTitle';
// import { Body3, H2, H4 } from '@/components/typo/Typography';
// import { Colors } from '@/constants/theme';

// const { width } = Dimensions.get('window');

// enum OrderStatus {
//     QUEUED = 1,
//     IN_PROGRESS = 2,
// }

// const OrderScreen: React.FC = () => {
//     const [step, setStep] = useState<OrderStatus>(OrderStatus.QUEUED);
//     const router = useRouter();

//     useEffect(() => {
//         let timer: ReturnType<typeof setTimeout>;

//         if (step === OrderStatus.QUEUED) {
//             timer = setTimeout(() => setStep(OrderStatus.IN_PROGRESS), 5000);
//         } else if (step === OrderStatus.IN_PROGRESS) {
//             timer = setTimeout(() => router.push('/guest/pickup-order'), 5000);
//         }

//         return () => {
//             if (timer) clearTimeout(timer);
//         };
//     }, [step]);

//     return (
//         <SafeAreaView style={styles.container}>
//             <View style={styles.header}>
//                 <SectionTitle title="My Orders" />
//             </View>

//             <View style={styles.content}>
//                 {/* Order Code Card */}
//                 <View style={styles.codeCard}>
//                     <H2 color="white" style={styles.codeText}>A44</H2>
//                     <H4 color="white" italic>Order Code</H4>
//                 </View>

//                 {/* Status Box */}
//                 <View
//                     style={[
//                         styles.statusBox,
//                         step === OrderStatus.QUEUED ? styles.borderOrange : styles.borderGreen,
//                     ]}
//                 >
//                     <View
//                         style={[
//                             styles.iconCircle,
//                             {
//                                 backgroundColor:
//                                     step === OrderStatus.QUEUED ? '#F9731633' : '#22C55E33', // Opacity optimize kora hoyeche
//                             },
//                         ]}
//                     >
//                         <Ionicons
//                             name={step === OrderStatus.QUEUED ? 'list' : 'time-outline'}
//                             size={24}
//                             color={step === OrderStatus.QUEUED ? '#F97316' : '#22C55E'}
//                         />
//                     </View>
//                     <View style={styles.statusTextContainer}>
//                         <H4 color={step === OrderStatus.QUEUED ? '#F97316' : '#22C55E'}>
//                             {step === OrderStatus.QUEUED ? 'Queued' : 'In Progress'}
//                         </H4>
//                         <Body3 color="#999">
//                             {step === OrderStatus.QUEUED
//                                 ? 'Your order is in the queue'
//                                 : 'Your drink is being prepared'}
//                         </Body3>
//                     </View>
//                 </View>

//                 <View style={styles.footer}>
//                     <Body3 color="white" align="center">
//                         We'll update you when your order is ready
//                     </Body3>
//                 </View>
//             </View>
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#0F0B1A',
//     },
//     header: {
//         width: '100%',
//         paddingVertical:"5%"
//     },
//     content: {
//         flex: 1,
//         paddingHorizontal: width * 0.05, 
//         alignItems: 'center',
//         paddingTop: Platform.OS === 'ios' ? 10 : 20,
//     },
//     codeCard: {
//         backgroundColor: Colors.COLOR_ACTIVE,
//         width: '100%',
//         aspectRatio: 16 / 7, 
//         maxHeight: 180,
//         borderRadius: 24,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginBottom: 24,
//         // iOS Shadow
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.3,
//         shadowRadius: 4.65,
//         elevation: 8,
//     },
//     codeText: {
//         marginBottom: 8,
//         fontSize: width * 0.12, 
//     },
//     statusBox: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         width: '100%',
//         padding: 18,
//         borderRadius: 20,
//         borderWidth: 1.5,
//         backgroundColor: 'rgba(255,255,255,0.05)',
//     },
//     statusTextContainer: {
//         marginLeft: 16,
//         flex: 1, 
//     },
//     borderOrange: { borderColor: '#F97316' },
//     borderGreen: { borderColor: Colors.COLOR_ACTIVE },
//     iconCircle: {
//         padding: 12,
//         borderRadius: 14,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     footer: {
//         marginTop: 'auto', 
//         marginBottom: 20,
//         width: '80%',
//     }
// });

// export default OrderScreen;



import { OrderStatusContent } from '@/components/ItemsRelated/OrderStatusContent';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OrderScreen() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#0F0B1A' }}>
            <OrderStatusContent 
                orderCode="G12" 
                nextRoute="/guest/pickup-order" 
            />
        </SafeAreaView>
    );
}