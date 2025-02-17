export class Query {
    Level = `
      level: transaction_aggregate(where: {
        _and: [
          { type: { _like: "level" } },
          { originEventId: { _eq: 41 } }
        ]
      }) {
        aggregate {
          max {
            amount
          }
        }
      }
    `;
  
    Myxp = `
      myxp: transaction_aggregate(where: {
        _and: [
          { type: { _like: "xp" } },
          { 
            _or: [
              { originEventId: { _eq: 41 } },
              { path: { _ilike: "/oujda/module/checkpoint/%" } },
              { path: { _ilike: "/oujda/module/piscine-js" } }
            ]
          }
        ]
      }) {
        aggregate {
          sum {
            amount
          }
        }
      }
    `;
  
    UserInfo = `
      user {
        firstName
        lastName
        email
        auditRatio
        login
        attrs
      }
    `;
    javascript

    projects= `
    projects:transaction(
        limit: 3,
        order_by: { createdAt: desc },
        where: {
          type: { _like: "xp" }
        }
      ) {
        path
      }
    `;
  }