import React, { useMemo, useState } from 'react';
import {
  SafeAreaView, View, Text, StyleSheet, Pressable, Image,
  ScrollView, StatusBar, useWindowDimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PETS = [
  { id: 'demo-1', name: 'Maja', type: 'Šuo', age: '2 metai', city: 'Kaunas', sex: 'Patelė', size: 'Vidutinė', about: 'Švelni, smalsi ir labai mėgstanti pasivaikščiojimus. Ieško žmogaus, su kuriuo galėtų pradėti naują gyvenimo etapą.', tags: ['Draugiška', 'Aktyvi', 'Mėgsta žmones'], image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=1000' },
  { id: 'demo-2', name: 'Pūkis', type: 'Katė', age: '1 metai', city: 'Vilnius', sex: 'Patinas', size: 'Maža', about: 'Ramus murklys, kuris mėgsta jaukius kampelius ir švelnų dėmesį. Puikiai tiktų ramesniems namams.', tags: ['Ramus', 'Namų katinas'], image: 'https://images.unsplash.com/photo-1573865526739-106592b5b7b5?w=1000' },
  { id: 'demo-3', name: 'Rikis', type: 'Šuo', age: '4 metai', city: 'Klaipėda', sex: 'Patinas', size: 'Didelis', about: 'Ištikimas bičiulis, mėgstantis aktyvų laiką lauke. Jam svarbiausia – savas žmogus ir nuoseklus ryšys.', tags: ['Aktyvus', 'Ištikimas'], image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=1000' },
  { id: 'demo-4', name: 'Luna', type: 'Katė', age: '3 metai', city: 'Kaunas', sex: 'Patelė', size: 'Maža', about: 'Smalsi ir savarankiška katytė. Iš pradžių gali būti atsargi, bet pripratusi dovanoja daug šilumos.', tags: ['Smalsi', 'Jautri'], image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=1000' }
];
const SHELTERS = [
  { name: 'Lesė', city: 'Vilnius / Kaunas', note: 'Gyvūnų globos organizacija' },
  { name: 'Penkta koja', city: 'Kauno rajonas', note: 'Gyvūnų prieglauda' },
  { name: 'Tautmilės globa', city: 'Vilnius', note: 'Gyvūnų gelbėjimas ir globa' },
  { name: 'Būk mano draugas', city: 'Klaipėda', note: 'Gyvūnų globos namai' }
];

export default function App() {
  const [tab, setTab] = useState('discover');
  const [filter, setFilter] = useState('Visi');
  const [index, setIndex] = useState(0);
  const [liked, setLiked] = useState([]);
  const { width } = useWindowDimensions();
  const wide = width > 760;
  const filtered = useMemo(() => PETS.filter(p => filter === 'Visi' || p.type === filter), [filter]);
  const current = filtered.length ? filtered[index % filtered.length] : null;
  const advance = () => setIndex(v => v + 1);
  const like = () => {
    if (current && !liked.some(p => p.id === current.id)) setLiked(v => [current, ...v]);
    advance();
  };
  const removeLike = id => setLiked(v => v.filter(p => p.id !== id));
  const nav = [
    ['discover', 'compass-outline', 'Atrasti'],
    ['saved', 'heart-outline', 'Mėgstami'],
    ['shelters', 'home-outline', 'Prieglaudos']
  ];
  const PetTile = ({ pet, saved = false }) => (
    <View style={styles.tile}>
      <Image source={{ uri: pet.image }} style={styles.tileImage} />
      <View style={styles.tileBody}>
        <View style={styles.rowBetween}>
          <Text style={styles.petName}>{pet.name}</Text>
          <Text style={styles.petMeta}>{pet.age}</Text>
        </View>
        <Text style={styles.petMeta}>{pet.type} · {pet.city} · {pet.sex}</Text>
        <Text style={styles.aboutSmall}>{pet.about}</Text>
        {saved && <Pressable onPress={() => removeLike(pet.id)} style={styles.remove}><Ionicons name="heart-dislike-outline" size={17} color="#9A5B46"/><Text style={styles.removeText}>Pašalinti</Text></Pressable>}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F4EC" />
      <View style={styles.shell}>
        <View style={styles.header}>
          <View style={styles.brandLine}>
            <View style={styles.logo}><Ionicons name="paw" size={21} color="#F7F4EC" /></View>
            <View><Text style={styles.brand}>pawmatch</Text><Text style={styles.tagline}>Draugystė prasideda čia</Text></View>
          </View>
          <View style={styles.headerRight}><View style={styles.demoPill}><View style={styles.dot}/><Text style={styles.demoText}>DEMO versija</Text></View></View>
        </View>
        <View style={[styles.content, wide && styles.contentWide]}>
          <View style={styles.intro}>
            <Text style={styles.eyebrow}>NAMŲ IEŠKANTYS GYVŪNAI</Text>
            <Text style={styles.heading}>{tab === 'discover' ? 'Galbūt čia tavo naujas geriausias draugas.' : tab === 'saved' ? 'Tavo širdžiai artimi.' : 'Susipažink su globėjais.'}</Text>
            <Text style={styles.subheading}>{tab === 'discover' ? 'Atrask, pamilk ir susisiek su gyvūną globojančia organizacija.' : tab === 'saved' ? 'Čia saugomi tavo pamėgti gyvūnai.' : 'Organizacijos, kurios kasdien rūpinasi gyvūnais.'}</Text>
          </View>
          {tab === 'discover' && <>
            <View style={styles.filters}>
              {['Visi', 'Šuo', 'Katė'].map(x => <Pressable key={x} onPress={() => {setFilter(x); setIndex(0);}} style={[styles.filter, filter === x && styles.filterActive]}><Text style={[styles.filterText, filter === x && styles.filterTextActive]}>{x === 'Visi' ? 'Visi gyvūnai' : x === 'Šuo' ? 'Šunys' : 'Katės'}</Text></Pressable>)}
              <View style={styles.count}><Text style={styles.countText}>{filtered.length} profiliai</Text></View>
            </View>
            {current ? <View style={[styles.discovery, wide && styles.discoveryWide]}>
              <View style={styles.heroCard}>
                <Image source={{ uri: current.image }} style={styles.heroImage} />
                <View style={styles.imageShade}/>
                <View style={styles.cardTop}><View style={styles.locationPill}><Ionicons name="location" size={13} color="#fff"/><Text style={styles.locationText}>{current.city}</Text></View><View style={styles.verifiedPill}><Ionicons name="sparkles" size={13} color="#344D3D"/><Text style={styles.verifiedText}>Ieško namų</Text></View></View>
                <View style={styles.heroInfo}>
                  <Text style={styles.heroName}>{current.name}<Text style={styles.heroAge}>  ·  {current.age}</Text></Text>
                  <Text style={styles.heroMeta}>{current.type}  ·  {current.sex}  ·  {current.size}</Text>
                  <Text style={styles.heroAbout}>{current.about}</Text>
                  <View style={styles.tags}>{current.tags.map(t => <View key={t} style={styles.tag}><Text style={styles.tagText}>{t}</Text></View>)}</View>
                </View>
              </View>
              <View style={styles.actions}>
                <Pressable onPress={advance} style={[styles.action, styles.pass]}><Ionicons name="close" size={28} color="#9A5B46"/></Pressable>
                <Pressable onPress={like} style={[styles.action, styles.love]}><Ionicons name="heart" size={27} color="#fff"/></Pressable>
              </View>
              <Text style={styles.swipeHint}>Patinka? Spausk širdelę ir išsaugok profilį.</Text>
            </View> : <Text style={styles.empty}>Pagal šiuos filtrus gyvūnų nerasta.</Text>}
          </>}
          {tab === 'saved' && <ScrollView contentContainerStyle={styles.list}>{liked.length ? liked.map(p => <PetTile key={p.id} pet={p} saved/>) : <View style={styles.emptyCard}><Ionicons name="heart-outline" size={34} color="#9A9B84"/><Text style={styles.emptyTitle}>Kol kas tuščia</Text><Text style={styles.emptyText}>Pamėgti gyvūnai atsiras čia.</Text><Pressable style={styles.primaryBtn} onPress={() => setTab('discover')}><Text style={styles.primaryText}>Atrasti gyvūnus</Text></Pressable></View>}</ScrollView>}
          {tab === 'shelters' && <ScrollView contentContainerStyle={styles.list}>{SHELTERS.map((s,i) => <View key={s.name} style={styles.shelterCard}><View style={styles.shelterIcon}><Ionicons name="home" size={22} color="#49624E"/></View><View style={{flex:1}}><Text style={styles.shelterName}>{s.name}</Text><Text style={styles.shelterNote}>{s.note}</Text><Text style={styles.shelterCity}><Ionicons name="location-outline" size={13}/> {s.city}</Text></View><Ionicons name="chevron-forward" size={19} color="#A5A391"/></View>)}</ScrollView>}
        </View>
        <View style={styles.bottomNav}>{nav.map(([key,icon,label]) => <Pressable key={key} onPress={() => setTab(key)} style={styles.navItem}><View style={[styles.navIcon, tab === key && styles.navIconActive]}><Ionicons name={icon} size={21} color={tab === key ? '#F7F4EC' : '#78816D'}/>{key === 'saved' && liked.length > 0 && <View style={styles.badge}><Text style={styles.badgeText}>{liked.length}</Text></View>}</View><Text style={[styles.navLabel, tab === key && styles.navLabelActive]}>{label}</Text></Pressable>)}</View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:{flex:1,backgroundColor:'#F7F4EC'},
  shell:{flex:1,width:'100%',maxWidth:1120,alignSelf:'center',backgroundColor:'#F7F4EC'},
  header:{height:76,paddingHorizontal:24,flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderBottomWidth:1,borderBottomColor:'#E9E4D8'},
  brandLine:{flexDirection:'row',alignItems:'center',gap:11},
  logo:{width:39,height:39,borderRadius:14,backgroundColor:'#526A55',alignItems:'center',justifyContent:'center'},
  brand:{fontSize:22,fontWeight:'800',letterSpacing:-1,color:'#283A2D'},
  tagline:{fontSize:10,color:'#8A8D7C',letterSpacing:.5,marginTop:1},
  headerRight:{flexDirection:'row',alignItems:'center'},
  demoPill:{backgroundColor:'#EEEBDD',paddingHorizontal:11,paddingVertical:7,borderRadius:30,flexDirection:'row',alignItems:'center',gap:6},
  dot:{width:6,height:6,borderRadius:3,backgroundColor:'#C18A4B'},
  demoText:{fontSize:10,fontWeight:'700',letterSpacing:.7,color:'#777763'},
  content:{flex:1,paddingHorizontal:20,paddingTop:25,paddingBottom:12},
  contentWide:{paddingHorizontal:42},
  intro:{marginBottom:18},
  eyebrow:{fontSize:10,fontWeight:'800',letterSpacing:1.8,color:'#A16E4F',marginBottom:8},
  heading:{fontSize:27,lineHeight:33,fontWeight:'800',letterSpacing:-.8,color:'#2C3B30',maxWidth:560},
  subheading:{fontSize:13,lineHeight:19,color:'#858779',marginTop:7,maxWidth:520},
  filters:{flexDirection:'row',alignItems:'center',gap:8,marginBottom:14},
  filter:{paddingVertical:9,paddingHorizontal:14,borderRadius:24,backgroundColor:'#EFECDF'},
  filterActive:{backgroundColor:'#526A55'},
  filterText:{fontSize:12,fontWeight:'600',color:'#6F7567'},
  filterTextActive:{color:'#fff'},
  count:{marginLeft:'auto'},countText:{fontSize:11,color:'#9A9A89'},
  discovery:{width:'100%',maxWidth:460,alignSelf:'center',flex:1},
  discoveryWide:{maxWidth:460},
  heroCard:{flex:1,minHeight:330,maxHeight:520,borderRadius:26,overflow:'hidden',backgroundColor:'#D7D2C3',position:'relative'},
  heroImage:{...StyleSheet.absoluteFillObject,width:'100%',height:'100%',resizeMode:'cover'},
  imageShade:{...StyleSheet.absoluteFillObject,backgroundColor:'rgba(20,28,20,0.10)'},
  cardTop:{position:'absolute',top:15,left:15,right:15,flexDirection:'row',justifyContent:'space-between'},
  locationPill:{flexDirection:'row',alignItems:'center',gap:4,backgroundColor:'rgba(32,39,31,.48)',paddingHorizontal:10,paddingVertical:7,borderRadius:18},
  locationText:{color:'#fff',fontSize:11,fontWeight:'700'},
  verifiedPill:{flexDirection:'row',alignItems:'center',gap:4,backgroundColor:'#F2F0E5',paddingHorizontal:10,paddingVertical:7,borderRadius:18},
  verifiedText:{color:'#344D3D',fontSize:10,fontWeight:'800'},
  heroInfo:{position:'absolute',bottom:0,left:0,right:0,padding:20,paddingTop:65,backgroundColor:'rgba(28,34,27,.78)'},
  heroName:{fontSize:29,fontWeight:'800',color:'#fff',letterSpacing:-.5},
  heroAge:{fontSize:16,fontWeight:'500',color:'#E4E0D4'},
  heroMeta:{fontSize:12,color:'#E0DDCF',marginTop:3},
  heroAbout:{fontSize:12,lineHeight:18,color:'#F4F0E6',marginTop:11},
  tags:{flexDirection:'row',flexWrap:'wrap',gap:6,marginTop:11},
  tag:{paddingHorizontal:9,paddingVertical:5,borderRadius:14,backgroundColor:'rgba(255,255,255,.17)'},
  tagText:{fontSize:10,color:'#fff',fontWeight:'600'},
  actions:{flexDirection:'row',justifyContent:'center',alignItems:'center',gap:23,paddingTop:14},
  action:{width:55,height:55,borderRadius:30,alignItems:'center',justifyContent:'center',shadowColor:'#263326',shadowOpacity:.09,shadowRadius:9,elevation:3},
  pass:{backgroundColor:'#fff',borderWidth:1,borderColor:'#E9E2D8'},
  love:{backgroundColor:'#C16F51'},
  swipeHint:{fontSize:10,color:'#999989',textAlign:'center',marginTop:7,marginBottom:2},
  bottomNav:{height:72,borderTopWidth:1,borderTopColor:'#E9E4D8',backgroundColor:'#F9F7F1',flexDirection:'row',justifyContent:'center',gap:55,alignItems:'center'},
  navItem:{alignItems:'center',justifyContent:'center',gap:3,minWidth:65},
  navIcon:{width:35,height:31,borderRadius:13,alignItems:'center',justifyContent:'center'},
  navIconActive:{backgroundColor:'#526A55'},
  navLabel:{fontSize:10,color:'#929384',fontWeight:'600'},
  navLabelActive:{color:'#344D3D',fontWeight:'800'},
  badge:{position:'absolute',right:-4,top:-5,backgroundColor:'#C16F51',minWidth:15,height:15,borderRadius:8,alignItems:'center',justifyContent:'center'},
  badgeText:{fontSize:9,color:'#fff',fontWeight:'800'},
  list:{gap:12,paddingBottom:24},
  tile:{backgroundColor:'#fff',borderRadius:20,overflow:'hidden',borderWidth:1,borderColor:'#EEE9DE'},
  tileImage:{width:'100%',height:175,resizeMode:'cover'},
  tileBody:{padding:15},
  rowBetween:{flexDirection:'row',alignItems:'center',justifyContent:'space-between'},
  petName:{fontSize:20,fontWeight:'800',color:'#2C3B30'},
  petMeta:{fontSize:11,color:'#858779',marginTop:4},
  aboutSmall:{fontSize:12,lineHeight:18,color:'#666D60',marginTop:9},
  remove:{flexDirection:'row',alignItems:'center',gap:6,marginTop:12},
  removeText:{fontSize:11,color:'#9A5B46',fontWeight:'700'},
  emptyCard:{backgroundColor:'#F0EDE2',borderRadius:22,padding:28,alignItems:'center',marginTop:30},
  emptyTitle:{fontSize:18,fontWeight:'800',color:'#344D3D',marginTop:10},
  emptyText:{fontSize:12,color:'#858779',marginTop:5},
  primaryBtn:{backgroundColor:'#526A55',paddingHorizontal:18,paddingVertical:11,borderRadius:22,marginTop:16},
  primaryText:{fontSize:12,color:'#fff',fontWeight:'700'},
  shelterCard:{backgroundColor:'#fff',borderRadius:18,padding:16,flexDirection:'row',alignItems:'center',gap:13,borderWidth:1,borderColor:'#EEE9DE'},
  shelterIcon:{width:45,height:45,borderRadius:15,backgroundColor:'#EEF0E6',alignItems:'center',justifyContent:'center'},
  shelterName:{fontSize:16,fontWeight:'800',color:'#344437'},
  shelterNote:{fontSize:11,color:'#858779',marginTop:3},
  shelterCity:{fontSize:11,color:'#A16E4F',marginTop:6},
  empty:{textAlign:'center',color:'#858779',padding:30}
});