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

    Projects= `
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
    Go_porcentag = `
      go_valid_exercise: transaction_aggregate(where: {
        _and: [
          { type: { _like: "xp" } },
          { path: { _like: "/oujda/piscine-go/quest-%" } }
        ]
      }) {
        aggregate {
          count
        }
      }
      
      go_exercise: path_aggregate(where: {
        _and: [
          { object: { type: { _like: "exercise" } } },
          { path: { _like: "/oujda/piscine-go/quest-%" } }
        ]
      }) {
        aggregate {
          count
        }
      }
    `;
    Js_porcentage = `
      js_valid_exercise: transaction_aggregate(where: {
        _and: [
          { type: { _like: "xp" } },
          { path: { _like: "/oujda/module/piscine-js/%" } }
        ]
      }) {
        aggregate {
          count
        }
      }
      
      js_exercise: path_aggregate(where: {
        _and: [
          { object: { type: { _like: "exercise" } } },
          { path: { _like: "/oujda/module/piscine-js/%" } }
        ]
      }) {
        aggregate {
          count
        }
      }
    `;
    Checkpoint = `
      passed_checkpoint: user_aggregate {
        nodes {
          events(where: {
            event: { path: { _like: "/oujda/module/checkpoint" } }
          }) {
            userName
          }
        }
      }
      
      valid_exercise: transaction_aggregate(where: {
        _and: [
          { path: { _like: "/oujda/module/checkpoint%" } },
          { type: { _eq: "xp" } }
        ]
      }) {
        aggregate {
          count
        }
      }
    `
  }