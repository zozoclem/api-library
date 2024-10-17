import jwt from 'jsonwebtoken';

export async function expressAuthentication(
  request: any,
  securityName: string,
  scopes?: string[]
): Promise<any> {
  if (securityName === "jwt") {
    const token =
      request.body.token ||
      request.query.token ||
      request.headers["authorization"]?.split(' ')[1];

    return new Promise((resolve, reject) => {
      if (!token) {
        console.log("No token provided");
        return reject(new Error("No token provided"));
      }

      jwt.verify(token, "your_jwt_secret_key", (err: any, decoded: any) => {
        if (err) {
          console.log("Failed to authenticate token:", err);
          return reject(err);
        } else {
          console.log("Token decoded:", decoded);
          if (scopes !== undefined) {
            const userPermissions: string[] = decoded.scopes || [];
            console.log("User permissions:", userPermissions);
            const hasPermissions = scopes.every(scope => userPermissions.includes(scope));
            if (!hasPermissions) {
              console.log("Insufficient permissions for scopes:", scopes);
              return reject(new Error("Insufficient permissions"));
            }

            // Vérification de la ressource et de la permission
            const [resource, permission] = scopes[0].split(':');
            console.log("Resource:", resource, "Permission:", permission);
            const resourcePermissions = userPermissions.filter((userPermission: string) => userPermission.startsWith(resource));
            console.log("Resource permissions:", resourcePermissions);
            if (!resourcePermissions.includes(`${resource}:${permission}`)) {
              console.log(`Insufficient permissions for resource: ${resource}`);
              return reject(new Error(`Insufficient permissions for resource: ${resource}`));
            }
          }
          resolve(decoded);
        }
      });
    });
  }
}