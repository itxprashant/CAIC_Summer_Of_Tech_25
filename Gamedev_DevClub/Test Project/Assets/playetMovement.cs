using UnityEngine;
using UnityEngine.InputSystem;

public class playetMovement : MonoBehaviour
{
    // Start is called once before the first execution of Update after the MonoBehaviour is created
    public Rigidbody rb;
    public bool useGravity = true;

    public float forwardForce = 2000f;

    void Start()
    {
        Debug.Log("Hello world");
        rb.useGravity = useGravity;
        // rb.AddForce(0, 200, 500);
    }

    // Update is called once per frame
    void FixedUpdate()
    {
        // add a force to the rigidbody in the forward direction

        if (Keyboard.current.wKey.isPressed)
        {
            rb.AddForce(0, 0, forwardForce * Time.deltaTime);
        }
        else if (Keyboard.current.sKey.isPressed)
        {
            rb.AddForce(0, 0, -forwardForce * Time.deltaTime);
        }
        else if (Keyboard.current.aKey.isPressed)
        {
            rb.AddForce(-forwardForce * Time.deltaTime, 0, 0);
        }
        else if (Keyboard.current.dKey.isPressed)
        {
            rb.AddForce(forwardForce * Time.deltaTime, 0, 0);
        }

        // jump
        if (Keyboard.current.spaceKey.isPressed)
        {
            rb.AddForce(0, 20, 0);
        }
    }
}
