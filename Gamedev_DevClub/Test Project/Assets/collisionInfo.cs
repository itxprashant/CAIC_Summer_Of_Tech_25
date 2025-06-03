using UnityEngine;

public class collisionInfo : MonoBehaviour
{
    void OnCollisionEnter(Collision collision)
    {
        if (collision.collider.tag == "Obstacle") {
            // reverse velocity
            Debug.Log("Collision with Obstacle detected. Reversing velocity.");
            Rigidbody rb = GetComponent<Rigidbody>();
            rb.linearVelocity = -rb.linearVelocity;
        }
        
    }
}
