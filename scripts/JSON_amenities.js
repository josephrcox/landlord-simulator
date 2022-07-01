export const amenities_list = [
    {
        title:"Pool",
        id:"pool",
        happiness:15,
        cost_upfront:200000,
        cost_upfront_per_building:0,
        cost_monthly:2000,
        cost_monthly_per_resident:10, // if random is set, this is the max
        cost_monthly_per_resident_random:false,
        cost_monthly_per_resident_min:0,
        cost_monthly_per_building:0,
        revenue_monthly:0,
        revenue_monthly_random:false,
        revenue_monthly_min:0,
        notes:"Happier residents<br/>Upfront cost: $200,000 upfront<br/>Monthly: $2,000 + $10/resident"
    },
    {
        title:"Free Utilities",
        id:"freeutilities",
        happiness:10,
        cost_upfront:0,
        cost_upfront_per_building:0,
        cost_monthly:0,
        cost_monthly_per_resident:200, // if random is set, this is the max
        cost_monthly_per_resident_random:true,
        cost_monthly_per_resident_min:100,
        cost_monthly_per_building:0,
        revenue_monthly:0,
        revenue_monthly_random:false,
        revenue_monthly_min:0,
        notes:"Happier residents<br/>Monthly cost: $100-$200 per resident"
    },
    {
        title:"Dogs are allowed",
        id:"dogs",
        happiness:5,
        cost_upfront:0,
        cost_upfront_per_building:0,
        cost_monthly:0,
        cost_monthly_per_resident:0, // if random is set, this is the max
        cost_monthly_per_resident_random:false,
        cost_monthly_per_resident_min:0,
        cost_monthly_per_building:100,
        revenue_monthly:4,
        revenue_monthly_random:true,
        revenue_monthly_min:1,
        notes:"Happier residents<br/>Monthly cost: $100 per building<br/>You get paid pet rent (varies)"
    },
    {
        title:"Cats are allowed",
        id:"cats",
        happiness:4,
        cost_upfront:0,
        cost_upfront_per_building:0,
        cost_monthly:0,
        cost_monthly_per_resident:0, // if random is set, this is the max
        cost_monthly_per_resident_random:false,
        cost_monthly_per_resident_min:0,
        cost_monthly_per_building:50,
        revenue_monthly:4,
        revenue_monthly_random:true,
        revenue_monthly_min:1,
        notes:"Happier residents<br/>Monthly cost: $50 per building<br/>You get paid pet rent (varies)"
    },
    {
        title:"Improved Security",
        id:"security",
        happiness:10,
        cost_upfront:80000,
        cost_upfront_per_building:0,
        cost_monthly:0,
        cost_monthly_per_resident:0, // if random is set, this is the max
        cost_monthly_per_resident_random:false,
        cost_monthly_per_resident_min:0,
        cost_monthly_per_building:200,
        revenue_monthly:0,
        revenue_monthly_random:false,
        revenue_monthly_min:0,
        notes:"Happier residents<br/>Upfront cost: $80,000<br/>Monthly: $200 per building<br/>Less trouble"
    },
    {
        title:"Improved parking",
        id:"parking",
        happiness:6,
        cost_upfront:30000,
        cost_upfront_per_building:0,
        cost_monthly:0,
        cost_monthly_per_resident:10, // if random is set, this is the max
        cost_monthly_per_resident_random:false,
        cost_monthly_per_resident_min:0,
        cost_monthly_per_building:0,
        revenue_monthly:0,
        revenue_monthly_random:false,
        revenue_monthly_min:0,
        notes:"Happier residents<br/>Upfront cost: $30,000<br/>Monthly: $10/resident"
    },
    {
        title:"In-building laundry",
        id:"laundry",
        happiness:7,
        cost_upfront:0,
        cost_upfront_per_building:8000,
        cost_monthly:0,
        cost_monthly_per_resident:0, // if random is set, this is the max
        cost_monthly_per_resident_random:false,
        cost_monthly_per_resident_min:0,
        cost_monthly_per_building:75,
        revenue_monthly:15,
        revenue_monthly_random:true,
        revenue_monthly_min:0,
        notes:"Happier residents<br/>Upfront cost: $8000/building<br/>Monthly cost: $50 per building<br/>Coin-op profit"
    },
    {
        title:"Fitness Center",
        id:"fitness",
        happiness:7,
        cost_upfront:120000,
        cost_upfront_per_building:0,
        cost_monthly:0,
        cost_monthly_per_resident:0, // if random is set, this is the max
        cost_monthly_per_resident_random:false,
        cost_monthly_per_resident_min:0,
        cost_monthly_per_building:600,
        revenue_monthly:5,
        revenue_monthly_random:true,
        revenue_monthly_min:5,
        notes:"Happier residents<br/>Upfront cost: $120,000<br/>Monthly: $200/building<br/>$5/resident access fee (profit)"
    },
    {
        title:"Quick turnover",
        id:"quickturnover",
        happiness:-40,
        cost_upfront:0,
        cost_upfront_per_building:0,
        cost_monthly:0,
        cost_monthly_per_resident:0, // if random is set, this is the max
        cost_monthly_per_resident_random:false,
        cost_monthly_per_resident_min:0,
        cost_monthly_per_building:0,
        revenue_monthly:0,
        revenue_monthly_random:false,
        revenue_monthly_min:0,
        notes:"Much less happy residents<br/>No more fixing units when people leave<br/>Significantly lower loss resident cost"
    },
]

/* 
{
    title:"",
    id:"",
    happiness:0,
    cost_upfront:0,
    cost_upfront_per_building:0,
    cost_monthly:0,
    cost_monthly_per_resident:0, // if random is set, this is the max
    cost_monthly_per_resident_random:false,
    cost_monthly_per_resident_min:0,
    cost_monthly_per_building:0,
    revenue_monthly:0,
    revenue_monthly_random:false,
    revenue_monthly_min:0,
    notes:""
},
 */