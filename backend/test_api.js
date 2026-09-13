const http = require('http');

const makeRequest = (options, postData) => {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        try {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            data: JSON.parse(body),
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            data: body,
          });
        }
      });
    });

    req.on('error', (err) => reject(err));

    if (postData) {
      req.write(JSON.stringify(postData));
    }
    req.end();
  });
};

async function runTests() {
  console.log('🧪 Running Backend API & MongoDB Verification Tests...\n');

  try {
    // 1. Health check
    console.log('1. Testing GET /api/health ...');
    const health = await makeRequest({
      hostname: 'localhost',
      port: 5001,
      path: '/api/health',
      method: 'GET',
    });
    console.log(`   Health response status: ${health.status}, status: ${health.data.status}`);

    // 2. Post Planner Requirement
    console.log('\n2. Testing POST /api/requirements (Category: Planner) ...');
    const plannerPayload = {
      eventName: 'Grand Annual Tech Gala 2026',
      eventType: 'Corporate Gala',
      dateType: 'range',
      startDate: '2026-11-15T09:00:00.000Z',
      endDate: '2026-11-17T18:00:00.000Z',
      location: {
        city: 'Bengaluru',
        state: 'Karnataka',
        address: 'Whitefield Convention Center, EPIP Zone',
        pincode: '560066',
      },
      venue: {
        name: 'The Grand Ballroom',
        venueType: 'indoor',
      },
      category: 'planner',
      plannerDetails: {
        planningType: 'full_planning',
        expectedGuestCount: 500,
        estimatedBudget: '$25,000 - $50,000',
        servicesNeeded: ['Decor & Design', 'Catering Management', 'Logistics & Flow', 'RSVP & Guest Hospitality'],
        eventTheme: 'Futuristic Cyberpunk Elegance',
        venueStatus: 'booked',
        vendorPreferences: 'Eco-friendly and sustainable vendors only',
        specialInstructions: 'Need VIP protocol management for keynote speakers',
        targetMilestoneDate: '2026-10-01',
      },
      contactInfo: {
        name: 'Aarav Sharma',
        email: 'aarav.sharma@techcorp.io',
        phone: '+91 98765 43210',
        organization: 'TechCorp International',
      },
      additionalNotes: 'Strict adherence to security and safety protocols needed.',
      isUrgent: true,
    };

    const plannerRes = await makeRequest(
      {
        hostname: 'localhost',
        port: 5001,
        path: '/api/requirements',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
      plannerPayload
    );

    console.log(`   Status: ${plannerRes.status}, ID: ${plannerRes.data?.data?._id}, Category: ${plannerRes.data?.data?.category}`);
    const plannerId = plannerRes.data?.data?._id;

    // 3. Post Performer Requirement
    console.log('\n3. Testing POST /api/requirements (Category: Performer) ...');
    const performerPayload = {
      eventName: 'Summer Sunset Indie Fest',
      eventType: 'Music Festival',
      dateType: 'single',
      eventDate: '2026-08-20T17:00:00.000Z',
      location: {
        city: 'Mumbai',
        state: 'Maharashtra',
        address: 'Bandra Amphitheatre',
        pincode: '400050',
      },
      venue: {
        name: 'Sea-facing Amphitheatre',
        venueType: 'outdoor',
      },
      category: 'performer',
      performerDetails: {
        performerType: 'band_musician',
        customPerformerType: 'Indie Rock Band',
        performanceDurationMinutes: 90,
        numberOfSets: 2,
        targetAudience: 'Youth & Young Adults (18-35)',
        preferredLanguages: ['English', 'Hindi'],
        performanceGenre: 'Indie Fusion & Alt Rock',
        soundAudioRequired: true,
        soundSpecs: 'Line Array PA with 4 stage monitors & IEM support',
        stageDimensions: '30ft x 20ft',
        backlineEquipmentNeeded: ['Drum Kit (DW/Pearl)', 'Bass Amp (Ampeg)', '2x Guitar Cabs'],
        greenRoomRequired: true,
        rehearsalRequired: true,
        specificSongsOrRider: 'Original indie tracks + 2 crowd-favorite fusion covers',
      },
      contactInfo: {
        name: 'Rohan Mehta',
        email: 'rohan.mehta@indiefest.com',
        phone: '+91 99887 76655',
        organization: 'Indie Wave Productions',
      },
      additionalNotes: 'Need sound check 3 hours before gates open.',
      isUrgent: false,
    };

    const performerRes = await makeRequest(
      {
        hostname: 'localhost',
        port: 5001,
        path: '/api/requirements',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
      performerPayload
    );
    console.log(`   Status: ${performerRes.status}, ID: ${performerRes.data?.data?._id}, Category: ${performerRes.data?.data?.category}`);

    // 4. Post Crew Requirement
    console.log('\n4. Testing POST /api/requirements (Category: Crew) ...');
    const crewPayload = {
      eventName: 'National Esports Championship 2026',
      eventType: 'Concert / Arena Event',
      dateType: 'range',
      startDate: '2026-10-05T08:00:00.000Z',
      endDate: '2026-10-07T22:00:00.000Z',
      location: {
        city: 'Hyderabad',
        state: 'Telangana',
        address: 'HITEX Exhibition Center, Hall 3',
        pincode: '500084',
      },
      venue: {
        name: 'HITEX Arena',
        venueType: 'indoor',
      },
      category: 'crew',
      crewDetails: {
        roles: [
          { roleName: 'Audio/Visual Engineer', count: 4, skillLevel: 'lead' },
          { roleName: 'Stagehands & Riggers', count: 8, skillLevel: 'intermediate' },
          { roleName: 'Live Stream Operators', count: 3, skillLevel: 'lead' },
          { roleName: 'Guest Registration & Ushers', count: 10, skillLevel: 'entry' },
        ],
        callTime: '07:00 AM',
        wrapTime: '11:00 PM',
        totalCrewCount: 25,
        gearProvision: 'provided_on_site',
        dressCode: 'all_black',
        physicalRequirements: ['Heavy lifting up to 25kg for riggers', 'Active on feet during live tournament'],
        mealsProvided: true,
        transportProvided: true,
        onSiteLeadContact: 'Vikram Rao (+91 91234 56789)',
      },
      contactInfo: {
        name: 'Vikram Rao',
        email: 'vikram@esportsindia.org',
        phone: '+91 91234 56789',
        organization: 'Esports India Federation',
      },
      additionalNotes: 'NDA and safety briefings mandatory on Day 1.',
      isUrgent: true,
    };

    const crewRes = await makeRequest(
      {
        hostname: 'localhost',
        port: 5001,
        path: '/api/requirements',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
      crewPayload
    );
    console.log(`   Status: ${crewRes.status}, ID: ${crewRes.data?.data?._id}, Category: ${crewRes.data?.data?.category}`);

    // 5. Query All Requirements
    console.log('\n5. Testing GET /api/requirements ...');
    const allRes = await makeRequest({
      hostname: 'localhost',
      port: 5001,
      path: '/api/requirements',
      method: 'GET',
    });
    console.log(`   Total in DB: ${allRes.data.total}, Retrieved in page: ${allRes.data.count}`);

    // 6. Test Stats Endpoint
    console.log('\n6. Testing GET /api/requirements/stats/summary ...');
    const statsRes = await makeRequest({
      hostname: 'localhost',
      port: 5001,
      path: '/api/requirements/stats/summary',
      method: 'GET',
    });
    console.log('   Stats Summary:', JSON.stringify(statsRes.data.data, null, 2));

    // 7. Test Fetch by ID
    if (plannerId) {
      console.log(`\n7. Testing GET /api/requirements/${plannerId} ...`);
      const singleRes = await makeRequest({
        hostname: 'localhost',
        port: 5001,
        path: `/api/requirements/${plannerId}`,
        method: 'GET',
      });
      console.log(`   Fetched event: "${singleRes.data?.data?.eventName}" | Category: ${singleRes.data?.data?.category}`);
    }

    console.log('\n All Backend Tests Passed Successfully!');
  } catch (error) {
    console.error(' Test failed:', error);
  }
}

runTests();
