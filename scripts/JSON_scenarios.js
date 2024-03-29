export const scenarios_list = [
    {
        title:"Your residents are fed up with their crappy dial-up speed internet, but unfortunately the fix costs quite a bit of dough.",
        a:"Upgrade internet for all (-$100,000",
        b:"Tell them to deal with it!",
        a_outcome:"cash,-100000&rating,20",
        b_outcome:"rating,-10",
        alertMSG:"",
        requiresPool:false,
        skipWithSecurity:false,
        securityAlert:"",
        oneoff:false,
    },
    {
        title:"An entrepreneur approaches you with a deal. They want to start selling knives door to door, bypassing normal security procedures.",
        a:"Say no",
        b:"Say yes",
        a_outcome:"",
        b_outcome:"alert,&cash,-50000&residents,-2&rating,-30",
        alertMSG:"Two residents are unfortunately stabbed in their apartments. The cops have no leads, but you must now pay $50,000 for the cleanup",
        requiresPool:false,
        skipWithSecurity:true,
        securityAlert:"Security was able to deter a sketchy man with knvies",
        oneoff:false,
    },
    {
        title:"The complex pool has been overtaken by wild squirrels.",
        a:"Pay each resident $100 to attack the squirrels and reclaim what is rightfully theirs",
        b:"Understand that the pool is no longer yours, and that is ok",
        a_outcome:"cashPerResident,-50&residents,-3&alert,",
        b_outcome:"amenities_pool,false",
        alertMSG:"The squirrels have been defeated, but 3 residents did not like your request and have found new homes elsewhere",
        requiresPool:true,
        skipWithSecurity:true,
        securityAlert:"Security was able to deter a faction of wild squirrels",
        oneoff:false,
    },
    {
        title:"You get an email from someone claiming that they can make your residents a bit happier for the small price of $7k/month (scales with more residents). Their resume looks legit and they have good references.",
        a:"Hire them",
        b:"Not a good fit",
        a_outcome:"salary,7000&rating,15",
        b_outcome:"",
        alertMSG:"",
        requiresPool:false,
        skipWithSecurity:false,
        securityAlert:"",
        oneoff:false,
    },
    {
        title:"You get an email from someone claiming that they can make your residents a bit happier for the small price of $15k/month (scales with more residents). Their resume looks legit and they have glowing references.",
        a:"Hire them",
        b:"Not a good fit",
        a_outcome:"salary,15000&rating,35",
        b_outcome:"",
        alertMSG:"",
        requiresPool:false,
        skipWithSecurity:false,
        securityAlert:"",
        oneoff:false,
    },
    {
        title:"One of your apartment buildings has burned down. Luckily, nobody was hurt, but there are residents that no longer have housing. ",
        a:"Kick 'em to the curb",
        b:"Build a new building for them",
        a_outcome:"rating,-25&building,-1",
        b_outcome:"rating,+15&cash,-600000",
        alertMSG:"",
        requiresPool:false,
        skipWithSecurity:false,
        securityAlert:"",
        oneoff:false,
    },
    {
        title:"An investor offers to buy 10% of your company for ~~1000000",
        a:"Sell 10% of your company",
        b:"Not right now",
        a_outcome:"cash,VAR&sell,-0.1",
        b_outcome:"",
        alertMSG:"",
        requiresPool:false,
        skipWithSecurity:false,
        securityAlert:"",
        oneoff:false,
    },
    {
        title:"An investor offers to buy 12% of your company for ~~1000000",
        a:"Sell 12% of your company",
        b:"Not right now",
        a_outcome:"cash,VAR&sell,-0.12",
        b_outcome:"",
        alertMSG:"",
        requiresPool:false,
        skipWithSecurity:false,
        securityAlert:"",
        oneoff:false,
    },
    {
        title:"An investor offers to buy 20% of your company for ~~1000000",
        a:"Sell 20% of your company",
        b:"Not right now",
        a_outcome:"cash,VAR&sell,-0.2",
        b_outcome:"",
        alertMSG:"",
        requiresPool:false,
        skipWithSecurity:false,
        securityAlert:"",
        oneoff:false,
    },
    {
        title:"An investor offers to buy 5% of your company for ~~1000000",
        a:"Sell 5% of your company",
        b:"Not right now",
        a_outcome:"cash,VAR&sell,-0.05",
        b_outcome:"",
        alertMSG:"",
        requiresPool:false,
        skipWithSecurity:false,
        securityAlert:"",
        oneoff:false,
    },
    {
        title:"An investor offers to buy 1% of your company for ~~1000000",
        a:"Sell 1% of your company",
        b:"Not right now",
        a_outcome:"cash,VAR&sell,-0.01",
        b_outcome:"",
        alertMSG:"",
        requiresPool:false,
        skipWithSecurity:false,
        securityAlert:"",
        oneoff:false,
    },
    {
        title:"An investor offers to buy 3% of your company for ~~1000000",
        a:"Sell 3% of your company",
        b:"Not right now",
        a_outcome:"cash,VAR&sell,-0.03",
        b_outcome:"",
        alertMSG:"",
        requiresPool:false,
        skipWithSecurity:false,
        securityAlert:"",
        oneoff:false,
    },
    {
        title:"An investor offers to buy 49% of your company for ~~1000000",
        a:"Sell 49% of your company",
        b:"Not right now",
        a_outcome:"cash,VAR&sell,-0.49",
        b_outcome:"",
        alertMSG:"",
        requiresPool:false,
        skipWithSecurity:false,
        securityAlert:"",
        oneoff:false,
    },
    {
        title:"An investor offers to buy 99% of your company for ~~1000000",
        a:"Sell 99% of your company",
        b:"Not right now",
        a_outcome:"cash,VAR&sell,-0.99",
        b_outcome:"",
        alertMSG:"",
        requiresPool:false,
        skipWithSecurity:false,
        securityAlert:"",
        oneoff:false,
    },
    {
        title:"An investor offers to buy 40% of your company for ~~1000000",
        a:"Sell 40% of your company",
        b:"Not right now",
        a_outcome:"cash,VAR&sell,-0.40",
        b_outcome:"",
        alertMSG:"",
        requiresPool:false,
        skipWithSecurity:false,
        securityAlert:"",
        oneoff:false,
    },
    {
        // lottery, break in is successful but lowers rating
        title:"One of your residents has won the lottery",
        a:"Break in and attempt to steal some of their earnings",
        b:"Congratulate them with a fruit basket",
        a_outcome:"cash,RAN10000000&rating,-30&alert,",
        b_outcome:"alert2,rating,7",
        alertMSG:"You were able to break in and swipe some cash, but the news got out quick and made several residents very uncomfortable",
        alertMSG_2:"The resident was very thankful for your fruit basket",
        requiresPool:false,
        skipWithSecurity:false,
        securityAlert:"",
        oneoff:false,
    },
    {
        // lottery, break in is unsuccessful and lowers rating
        title:"One of your residents has won the lottery",
        a:"Break in and attempt to steal some of their earnings",
        b:"Congratulate them with a fruit basket",
        a_outcome:"rating,-30&alert,",
        b_outcome:"alert2,rating,7",
        alertMSG:"Your robbery was unsuccesful and caused severe distress in your residents",
        alertMSG_2:"The resident was very thankful for your fruit basket",
        requiresPool:false,
        skipWithSecurity:false,
        securityAlert:"",
        oneoff:false,
    },
    {
        // description
        title:"A resident refuses to stop mowing the lawn outside of their building. It is quite nice, but you feel kind of bad. ",
        a:"Offer them a job for $500/month to keep up their good work",
        b:"Look the other way",
        a_outcome:"salary,500&rating,5",
        b_outcome:"",
        alertMSG:"",
        alertMSG_2:"",
        requiresPool:false,
        skipWithSecurity:false,
        securityAlert:"",
        oneoff:false,
    },
    {
        // description
        title:'A resident approaches you with an idea, "2 words. Dodgeball Competition"',
        a:"Sure",
        b:"Um..No?",
        a_outcome:"rating,15",
        b_outcome:"",
        alertMSG:"The official resident dodgeball competition was fun and exciting! Morale is high, and people can't see what other activities come next!",
        alertMSG_2:"",
        requiresPool:false,
        skipWithSecurity:false,
        securityAlert:"",
        oneoff:true,
    },
    {
        // description
        title:" ",
        a:"",
        b:"",
        a_outcome:"",
        b_outcome:"",
        alertMSG:"",
        alertMSG_2:"",
        requiresPool:false,
        skipWithSecurity:false,
        securityAlert:"",
        oneoff:false
    },
]



/* 

{
    // description
    title:"",
    a:"",
    b:"",
    a_outcome:"",
    b_outcome:"",
    alertMSG:"",
    alertMSG_2:"",
    requiresPool:false,
    skipWithSecurity:false,
    securityAlert:"",
    oneoff:false
},

*/